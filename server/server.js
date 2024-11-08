const express = require("express");
const app = express();
const port = process.env.PORT || 5100;

const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

connection.connect();

const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    // DB에서 유저 정보 가져오기
    const query = `SELECT profile_image FROM artlove1_art_lover.users WHERE id = ?`;
    connection.query(query, [user.id], (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).json({
          message: "서버 에러로 인해 사용자 정보를 불러올 수 없습니다.",
        });
      }

      // 유저 정보가 없을 경우 에러 처리
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "해당 사용자를 찾을 수 없습니다." });
      }

      // 토큰에 있던 유저 정보와 함께 프로필 이미지 URL을 추가
      req.user = {
        ...user,
        imgUrl: results[0].profile_image,
      };

      next();
    });
  });
};

app.post("/api/check-email", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "이메일이 필요합니다." });
  }

  const query = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }

    const emailExists = results[0].count > 0;
    res.status(200).json({ isAvailable: !emailExists });
  });
});

// 회원가입
app.post("/api/register", async (req, res) => {
  const { role, email, nickname, password, birthday, profile_image } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userQuery = `
      INSERT INTO artlove1_art_lover.users (nickname, email, password, birthday, profile_image, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      userQuery,
      [nickname, email, hashedPassword, birthday, profile_image, "general"],
      (err, userResult) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return res.status(500).send("Error registering user");
        }

        const userId = userResult.insertId;

        // role이 "general"이 아닌 경우에만 permissions 테이블에 삽입
        if (role !== "general") {
          const permissionsQuery = `
            INSERT INTO artlove1_art_lover.permissions (user_id, request, flag)
            VALUES (?, ?, ?)
          `;

          connection.query(
            permissionsQuery,
            [userId, role, false],
            (permErr) => {
              if (permErr) {
                console.error("Error setting permissions:", permErr);
                return res
                  .status(500)
                  .send("Error registering user permissions");
              }
              res
                .status(201)
                .send("User registered successfully with permissions");
            }
          );
        } else {
          // role이 "general"인 경우 바로 성공 응답
          res
            .status(201)
            .send(
              "User registered successfully without additional permissions"
            );
        }
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error registering user");
  }
});

// 로그인
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM artlove1_art_lover.users WHERE email = ?`;
  connection.query(query, [email], async (err, rows) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({
        message: "서버 에러로 인해 사용자 정보를 불러오지 못했습니다.",
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "존재하지 않는 이메일입니다." });
    }

    const user = rows[0];
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      const token = jwt.sign(
        {
          id: user.id,
          galleryId: user.gallery_id,
          role: user.role,
          userName: user.nickname,
          imgUrl: user.profile_image,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.header("Access-Control-Allow-Credentials", "true");
      return res.status(200).json({
        message: "로그인 성공",
        userId: user.id,
        galleryId: user.gallery_id,
        role: user.role,
        userName: user.nickname,
        imgUrl: user.profile_image,
      });
    } catch (error) {
      console.error("비밀번호 비교 중 오류 발생:", error);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 로그인을 처리할 수 없습니다." });
    }
  });
});

// 로그아웃
app.post("/api/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({ message: "로그아웃 성공" });
});

// 로그인 상태 확인
app.get("/api/auth/status", verifyAuthToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    galleryId: req.user.galleryId,
    role: req.user.role,
    userName: req.user.userName,
    imgUrl: req.user.imgUrl,
  });
});



app.get("/api/galleryname/:galleryId", (req, res) => {
  const { galleryId } = req.params;

  const query = `SELECT gallery_name FROM artlove1_art_lover.galleries WHERE id = ?`;
  connection.query(query, [galleryId], (err, results) => {
    if (err) {
      console.error("Error fetching gallery name:", err);
      return res.status(500).json({ message: "갤러리 이름 가져오기 실패" });
    }

    if (results.length > 0) {
      res.status(200).json({ gallery_name: results[0].gallery_name });
    } else {
      res.status(404).json({ message: "갤러리 이름을 찾을 수 없습니다." });
    }
  });
});

// ============================== curator ================================
// POST curator post
app.post("/api/curatorPosts", (req, res) => {
  const {
    curator_id,
    show_id,
    title,
    content,
    created_at,
    updated_at,
    like_count,
  } = req.body;

  const query = `
    INSERT INTO artlove1_art_lover.curator_posts
    (curator_id, show_id, title, content, created_at, updated_at, like_count)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [curator_id, show_id, title, content, created_at, updated_at, like_count],
    (err, result) => {
      if (err) {
        console.error("Error inserting post:", err);
        return res.status(500).json({ message: "게시물 등록 실패" });
      }
      res.status(201).json({ message: "게시물이 성공적으로 등록되었습니다." });
    }
  );
});

// GET curator post list
app.get("/api/curatorPosts", (req, res) => {
  const query = `
    SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
           cp.like_count, u.nickname AS curator_name, u.profile_image
    FROM artlove1_art_lover.curator_posts cp
    JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
    ORDER BY cp.created_at DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching recent curator posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

// GET recent 3 curator post
app.get("/api/curatorPosts/latest", (req, res) => {
  const query = `
    SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
           cp.like_count, u.nickname AS curator_name
    FROM artlove1_art_lover.curator_posts cp
    JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
    ORDER BY cp.created_at DESC
    LIMIT 3
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching recent curator posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

//  GET curator post id로 내용 불러오기
app.get("/api/curatorPosts/:id", (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId;

  const query = `
    SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
           cp.like_count, u.nickname AS curator_name,
           s.show_name, s.show_term_start, s.show_term_end, s.show_place,
           s.show_price, s.show_link, s.show_place_detail,
           g.business_hours,
           EXISTS(
             SELECT 1 FROM likes
             WHERE user_id = ? AND curator_post_id = ?
           ) AS isLiked
    FROM artlove1_art_lover.curator_posts cp
    JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
    LEFT JOIN artlove1_art_lover.shows s ON cp.show_id = s.id
    LEFT JOIN artlove1_art_lover.galleries g ON s.gallery = g.id
    WHERE cp.id = ?
  `;

  connection.query(query, [userId, postId, postId], (err, results) => {
    if (err) {
      console.error("Error fetching curator post:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 게시물을 찾을 수 없습니다." });
    }

    res.status(200).json(results[0]);
  });
});

// PUT 큐레이터 포스트 업데이트 API
app.put("/api/curatorPosts/:id", (req, res) => {
  const postId = req.params.id;
  const { show_id, title, content, updated_at } = req.body;

  const query = `
    UPDATE artlove1_art_lover.curator_posts
    SET
      show_id = ?,
      title = ?,
      content = ?,
      updated_at = ?
    WHERE id = ?`;

  connection.query(
    query,
    [show_id, title, content, updated_at, postId],
    (err, result) => {
      if (err) {
        console.error("Error updating curator post:", err);
        return res
          .status(500)
          .json({ message: "서버 에러로 인해 게시물 수정에 실패했습니다." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "해당 게시물을 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
    }
  );
});

// DEL 큐레이터 아이디로 삭제
app.delete("/api/curatorPosts/:id", (req, res) => {
  const postId = req.params.id;

  const query = `
    DELETE FROM artlove1_art_lover.curator_posts WHERE id = ?
  `;

  connection.query(query, [postId], (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ message: "게시물 삭제 실패" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
  });
});

//================================ ordinary post ===============================

// 이미지 저장을 위한 multer 설정
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/img/postImg")); // 절대 경로 사용 권장
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPost = multer({ storage: postStorage });

// POST ordinary post (이미지 포함)
app.post("/api/ordinaryPosts", uploadPost.single("image"), (req, res) => {
  const {
    author_id,
    title,
    content,
    created_at,
    updated_at,
    like_count = 0,
    comment_count = 0,
  } = req.body;

  // 업로드된 이미지의 클라이언트 접근 경로 생성
  const imageUrl = req.file ? `/img/profileImg/${req.file.filename}` : null; // 이미지가 없으면 null

  const query = `
    INSERT INTO artlove1_art_lover.posts
    (author_id, title, content, created_at, updated_at, like_count, comment_count, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      author_id,
      title,
      content,
      created_at,
      updated_at,
      like_count,
      comment_count,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting ordinary post:", err);
        return res.status(500).json({ message: "게시물 등록 실패" });
      }
      res.status(201).json({ message: "게시물이 성공적으로 등록되었습니다." });
    }
  );
});

// GET ordinary post section
app.get("/api/ordinaryPosts", (req, res) => {
  const query = `
    SELECT p.id, p.author_id, p.title, p.content, p.created_at,
           p.like_count, p.comment_count, u.nickname AS author_name
    FROM artlove1_art_lover.posts p
    JOIN artlove1_art_lover.users u ON p.author_id = u.id
    ORDER BY p.created_at DESC
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching ordinary posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

// GET ordinary post list
app.get("/api/ordinaryPosts/latest", (req, res) => {
  const query = `
    SELECT p.id, p.author_id, p.title, 
           p.like_count, p.comment_count, u.nickname AS author_name
    FROM artlove1_art_lover.posts p
    JOIN artlove1_art_lover.users u ON p.author_id = u.id
    ORDER BY p.created_at DESC
    Limit 4
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching ordinary posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

// GET ordinary post by ID
app.get("/api/ordinaryPosts/:id", (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId;

  const query = `
    SELECT p.id, p.author_id, p.title, p.content, p.created_at,
           p.like_count, p.comment_count, u.nickname AS author_name,
           u.profile_image,  -- 프로필 이미지 추가
           EXISTS(
             SELECT 1 FROM likes
             WHERE user_id = ? AND post_id = ?
           ) AS isLiked
    FROM artlove1_art_lover.posts p
    JOIN artlove1_art_lover.users u ON p.author_id = u.id
    WHERE p.id = ?
  `;

  connection.query(query, [userId, postId, postId], (err, results) => {
    if (err) {
      console.error("Error fetching ordinary post:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 게시물을 찾을 수 없습니다." });
    }

    res.status(200).json(results[0]);
  });
});

// PUT ordinary post by ID
app.put("/api/ordinaryPosts/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content, updated_at } = req.body;

  const query = `
    UPDATE artlove1_art_lover.posts
    SET title = ?, content = ?, updated_at = ?
    WHERE id = ?`;

  connection.query(
    query,
    [title, content, updated_at, postId],
    (err, result) => {
      if (err) {
        console.error("Error updating ordinary post:", err);
        return res
          .status(500)
          .json({ message: "서버 에러로 인해 게시물 수정에 실패했습니다." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "해당 게시물을 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
    }
  );
});

// DELETE ordinary post by ID
app.delete("/api/ordinaryPosts/:id", (req, res) => {
  const postId = req.params.id;

  const query = `
    DELETE FROM artlove1_art_lover.posts WHERE id = ?
  `;

  connection.query(query, [postId], (err, result) => {
    if (err) {
      console.error("Error deleting ordinary post:", err);
      return res.status(500).json({ message: "게시물 삭제 실패" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
  });
});
// ================================== show ======================================

// POST exhibition post (이미지 포함)
const exhibitionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/img/exhibitionImg")); // 저장 경로 설정
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname.replace(ext, ".webp")}`); // 파일명 설정
  },
});

const uploadExhibition = multer({ storage: exhibitionStorage });

app.post(
  "/api/exhibitionPosts",
  uploadExhibition.array("images", 10),
  async (req, res) => {
    const {
      show_name,
      show_artist,
      show_term_start,
      show_term_end,
      show_city,
      gallery,
      show_place,
      show_search,
      show_price,
      show_link,
      show_imgs,
      show_brief,
      instagram_search,
      on_display,
      show_place_detail,
      selectedTags,
    } = req.body;

    try {
      // 이미지 처리
      const imageUrls = [];
      if (req.files) {
        for (let file of req.files) {
          const outputFile = `${Date.now()}-${file.originalname}.webp`;
          const outputPath = path.join(
            __dirname,
            "../client/public/img/exhibitionImg",
            outputFile
          );

          // sharp를 이용해 이미지를 webp로 변환하고 저장
          await sharp(file.path).webp({ quality: 70 }).toFile(outputPath);

          // 원본 파일 삭제
          fs.unlinkSync(file.path);

          // webp로 변환된 파일의 경로 저장
          imageUrls.push(`/img/exhibitionImg/${outputFile}`);
        }
      }

      // 이미지 URL을 원하는 형식으로 변환
      const formattedImageUrls = `{${imageUrls
        .map((url) => `"${url}"`)
        .join(", ")}}`;

      // MySQL 쿼리로 전시 데이터 저장
      const query = `
      INSERT INTO artlove1_art_lover.shows
      (show_name, show_artist, show_term_start, show_term_end, show_city, gallery, show_place, show_search, show_price, show_link, show_imgs, image_url, show_brief, instagram_search, on_display, show_place_detail)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      connection.query(
        query,
        [
          show_name,
          show_artist,
          show_term_start,
          show_term_end,
          show_city,
          gallery,
          show_place,
          show_search,
          show_price,
          show_link,
          show_imgs,
          formattedImageUrls,
          show_brief,
          instagram_search,
          on_display,
          show_place_detail,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting exhibition data:", err);
            return res.status(500).json({ message: "전시 정보 등록 실패" });
          }

          const exhibitionId = result.insertId;

          // 전시회 태그를 exhibition_tags 테이블에 저장
          const parsedTags = JSON.parse(selectedTags);
          const tagInsertPromises = parsedTags.map((tagId) => {
            const tagQuery = `INSERT INTO artlove1_art_lover.exhibition_tags (exhibition_id, tag_id) VALUES (?, ?)`;
            return new Promise((resolve, reject) => {
              connection.query(tagQuery, [exhibitionId, tagId], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          });

          // 모든 태그 삽입 완료 후 응답
          Promise.all(tagInsertPromises)
            .then(() => {
              res.status(201).json({
                message: "전시 정보와 태그가 성공적으로 등록되었습니다.",
              });
            })
            .catch((tagErr) => {
              console.error("Error inserting tags:", tagErr);
              res.status(500).json({ message: "태그 등록 실패" });
            });
        }
      );
    } catch (error) {
      console.error("Error during exhibition post creation:", error);
      res.status(500).json({ message: "전시 등록 중 서버 에러" });
    }
  }
);

// GET exhibition post section
app.get("/api/exhibitionPosts", (req, res) => {
  const query = `
    SELECT
      s.id, s.show_place, s.show_name, s.show_term_start, s.show_term_end,
      s.image_url, u.profile_image
    FROM artlove1_art_lover.shows s
    LEFT JOIN artlove1_art_lover.users u ON s.gallery = u.gallery_id
    ORDER BY s.show_term_start DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching exhibition posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    // 각 결과의 image_url을 배열로 변환
    const processedResults = results.map((post) => {
      if (post.image_url) {
        post.image_url = post.image_url
          .replace(/^{|}$/g, "") // 중괄호 제거
          .split(",") // 콤마로 분리
          .map((url) => url.trim()); // 각 URL의 공백 제거
      } else {
        post.image_url = []; // image_url이 없는 경우 빈 배열
      }
      return post;
    });

    res.status(200).json(processedResults);
  });
});

// GET exhibition post list
app.get("/api/exhibitionPosts/latest", (req, res) => {
  const query = `
    SELECT s.id, s.show_place, s.show_name, s.show_term_start, s.show_term_end
    FROM artlove1_art_lover.shows s
    ORDER BY s.show_term_start DESC
    Limit 3
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching ordinary posts:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

// GET exhibition post by ID
app.get("/api/exhibitionPosts/:id", (req, res) => {
  const postId = req.params.id;
  const query = `
    SELECT 
      s.id, 
      s.show_name, 
      s.show_artist, 
      s.show_term_start, 
      s.show_term_end,
      s.show_place, 
      s.show_price,
      s.show_link,
      s.show_imgs,
      s.image_url,
      s.instagram_search,
      s.show_place_detail,
      GROUP_CONCAT(t.tag_name) AS tags,
      g.gallery_add_word,
      g.gallery_add_tude,
      g.gallery_phone_num,
      g.business_hours,
      g.business_week,
      g.site
    FROM artlove1_art_lover.shows s
    JOIN artlove1_art_lover.exhibition_tags et ON s.id = et.exhibition_id
    JOIN artlove1_art_lover.tags t ON et.tag_id = t.id
    JOIN artlove1_art_lover.galleries g ON s.gallery = g.id
    WHERE s.id = ?
    GROUP BY
      s.id,
      g.gallery_add_word,
      g.gallery_add_tude,
      g.gallery_phone_num,
      g.business_hours,
      g.business_week,
      g.site;
  `;

  connection.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching exhibition post:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 게시물을 불러올 수 없습니다." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 게시물을 찾을 수 없습니다." });
    }

    const post = results[0];

    post.tags = post.tags ? post.tags.split(",") : [];
    if (post.image_url) {
      post.image_url = post.image_url
        .replace(/^{|}$/g, "")
        .split(",")
        .map((url) => url.trim());
    } else {
      post.image_url = [];
    }

    res.status(200).json(post);
  });
});

// ================================== mypage ======================================
// 유저 정보 갖고오기
app.get("/api/mypage/:id", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT role, nickname, profile_image, created_at, bio,
           website, x, instagram, thread
    FROM artlove1_art_lover.users
    WHERE id = ?`;

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({
        message: "서버 에러로 인해 사용자 정보를 불러올 수 없습니다.",
      });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json(result[0]);
  });
});

// 유저 정보 업데이트 (마이페이지 수정)
app.put("/api/mypage/:id", verifyAuthToken, (req, res) => {
  const userId = req.params.id;
  const { nickname, bio, website, x, instagram, thread, profile_image } =
    req.body;

  // 사용자 인증된 ID와 요청 ID가 다른 경우 권한 없음 응답
  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ message: "권한이 없습니다." });
  }

  const query = `
    UPDATE artlove1_art_lover.users
    SET nickname = ?, bio = ?, website = ?, x = ?, instagram = ?, thread = ?, profile_image = ?
    WHERE id = ?`;

  connection.query(
    query,
    [nickname, bio, website, x, instagram, thread, profile_image, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user data:", err);
        return res.status(500).json({
          message: "서버 에러로 인해 사용자 정보를 업데이트할 수 없습니다.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      res
        .status(200)
        .json({ message: "프로필이 성공적으로 업데이트되었습니다." });
    }
  );
});

// multer 설정
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/img/profileImg"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}-${Date.now()}${ext}`);
  },
});

const uploadProfile = multer({ storage: profileStorage }); // 수정: storage 필드를 설정

// 프로필 이미지 업로드
app.post(
  "/api/upload/avatar/:id",
  verifyAuthToken,
  uploadProfile.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "이미지 업로드 실패" });
    }

    const userId = req.params.id;

    // 이전 프로필 이미지 파일 삭제
    const query = `SELECT profile_image FROM users WHERE id = ?`;
    connection.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error fetching user profile image:", err);
        return res
          .status(500)
          .json({ message: "서버 에러로 인해 이미지 삭제에 실패했습니다." });
      }

      if (results.length > 0) {
        const oldImagePath = results[0].profile_image;
        if (oldImagePath) {
          const fullPath = path.join(
            __dirname,
            "../client/public",
            oldImagePath
          );
          fs.unlink(fullPath, (err) => {
            if (err) console.error("이전 이미지 삭제 중 오류 발생:", err);
          });
        }
      }

      const filePath = `/img/profileImg/${userId}-${Date.now()}.webp`;

      try {
        // 파일을 읽어 Buffer로 변환하여 Sharp에 전달
        const imageBuffer = fs.readFileSync(req.file.path);

        await sharp(imageBuffer)
          .resize(500, 500, {
            fit: sharp.fit.cover,
          })
          .webp({ quality: 70 })
          .toFile(path.join(__dirname, "../client/public", filePath));

        // 원본 파일 삭제
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("원본 파일 삭제 중 오류:", err);
        });

        // 데이터베이스에 새로운 파일 경로 저장
        const updateQuery = `UPDATE users SET profile_image = ? WHERE id = ?`;
        connection.query(updateQuery, [filePath, userId], (updateErr) => {
          if (updateErr) {
            console.error("Error updating profile image:", updateErr);
            return res
              .status(500)
              .json({ message: "이미지 저장에 실패했습니다." });
          }

          res.status(200).json({ success: true, filePath });
        });
      } catch (compressionError) {
        console.error("이미지 압축 중 오류 발생:", compressionError);
        return res.status(500).json({ message: "이미지 압축 실패" });
      }
    });
  }
);


// 쇼 이름으로 ID 검색 API
app.get("/api/searchShowId", (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "검색어를 입력해주세요." });
  }
  const searchQuery = `
    SELECT id, show_name, show_place
    FROM artlove1_art_lover.shows
    WHERE show_search LIKE ?
  `;

  connection.query(searchQuery, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error fetching shows:", err);
      return res
        .status(500)
        .json({ message: "서버 에러로 인해 전시 정보를 불러올 수 없습니다." });
    }

    res.status(200).json(results);
  });
});

// ================================== comments ======================================

app.get("/api/post/comment/:id", (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId; // 쿼리 파라미터에서 사용자 ID 가져옴

  // 댓글 및 작성자 정보와 isLiked 상태를 가져오는 쿼리
  const query = `
    SELECT pc.id, pc.post_id, pc.user_id, pc.content, pc.like_count, pc.created_at, 
           pc.file_url, u.nickname, u.profile_image,
           EXISTS(
             SELECT 1 FROM likes
             WHERE user_id = ? AND comment_id = pc.id
           ) AS isLiked
    FROM post_comments pc
    JOIN users u ON pc.user_id = u.id
    WHERE pc.post_id = ?;
  `;

  connection.query(query, [userId, postId], (err, results) => {
    if (err) {
      console.error("Error fetching post comments:", err);
      return res.status(500).json({ message: "서버 오류" });
    }

    res.status(200).json(results);
  });
});

const commentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/img/commentImg"));
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId;
    if (!userId) {
      return cb(new Error("userId가 필요합니다"));
    }
    const timestamp = Date.now();
    cb(null, `${userId}-${timestamp}.webp`);
  },
});

const uploadComment = multer({ storage: commentStorage });

app.post(
  "/api/post/comment/:id",
  uploadComment.single("file"),
  async (req, res) => {
    const postId = req.params.id;
    const { userId, content, createdAt } = req.body;
    let fileUrl = null;

    try {
      if (req.file) {
        const outputFilePath = path.join(
          __dirname,
          "../client/public/img/commentImg",
          `${userId}-${Date.now()}.webp`
        );

        // 이미지 변환 및 저장
        await sharp(req.file.path).webp({ quality: 70 }).toFile(outputFilePath);

        // 원본 파일 삭제
        fs.unlinkSync(req.file.path);

        // webp 파일의 URL 설정
        fileUrl = `/img/commentImg/${path.basename(outputFilePath)}`;
      }

      const query = `
        INSERT INTO post_comments (post_id, user_id, content, created_at, file_url)
        VALUES (?, ?, ?, ?, ?)
      `;

      connection.query(
        query,
        [postId, userId, content, createdAt, fileUrl],
        (err, result) => {
          if (err) {
            console.error("Error inserting new comment:", err);
            return res.status(500).json({ message: "댓글 추가 실패" });
          }

          // 댓글이 성공적으로 추가된 후 posts 테이블의 comment_count를 증가시킴
          const updateCommentCountQuery = `
            UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?
          `;

          connection.query(updateCommentCountQuery, [postId], (err) => {
            if (err) {
              console.error("Error updating comment count:", err);
              return res.status(500).json({ message: "댓글 수 업데이트 실패" });
            }

            res.status(201).json({
              message: "댓글이 성공적으로 추가되었습니다.",
              comment: {
                id: result.insertId,
                post_id: postId,
                user_id: userId,
                content,
                created_at: createdAt,
                file_url: fileUrl,
              },
            });
          });
        }
      );
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).json({ message: "파일 처리 중 오류가 발생했습니다." });
    }
  }
);


app.put(
  "/api/post/comment/:id",
  uploadComment.single("file"),
  async (req, res) => {
    const commentId = req.params.id;
    const { userId, content } = req.body;
    let newFileUrl = null;

    try {
      // 기존 이미지 파일 경로 가져오기
      const [existingComment] = await new Promise((resolve, reject) => {
        const query = "SELECT file_url FROM post_comments WHERE id = ?";
        connection.query(query, [commentId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });

      if (!existingComment) {
        return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      }

      // 새로운 파일 업로드 및 변환
      if (req.file) {
        const outputFilePath = path.join(
          __dirname,
          "../client/public/img/commentImg",
          `${userId}-${Date.now()}.webp`
        );
        await sharp(req.file.path).webp({ quality: 70 }).toFile(outputFilePath);
        fs.unlinkSync(req.file.path);

        // 새 파일 URL 설정
        newFileUrl = `/img/commentImg/${path.basename(outputFilePath)}`;

        // 기존 파일 삭제
        if (existingComment.file_url) {
          const existingFilePath = path.join(
            __dirname,
            "../client/public",
            existingComment.file_url
          );
          if (fs.existsSync(existingFilePath)) {
            fs.unlinkSync(existingFilePath);
          }
        }
      }

      // 댓글 내용 및 파일 URL 업데이트
      const query = `
        UPDATE post_comments 
        SET content = ?, file_url = COALESCE(?, file_url)
        WHERE id = ? AND user_id = ?;
      `;
      connection.query(
        query,
        [content, newFileUrl, commentId, userId],
        (err) => {
          if (err) {
            console.error("Error updating comment:", err);
            return res.status(500).json({ message: "댓글 수정 실패" });
          }
          res.status(200).json({
            message: "댓글이 성공적으로 수정되었습니다.",
            content,
            file_url: newFileUrl,
          });
        }
      );
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).json({ message: "파일 처리 중 오류가 발생했습니다." });
    }
  }
);

// 댓글 삭제 엔드포인트
app.delete("/api/post/comment/:id", async (req, res) => {
  const commentId = req.params.id;

  try {
    // 삭제할 댓글의 post_id 가져오기
    const [comment] = await new Promise((resolve, reject) => {
      const query = "SELECT post_id, file_url FROM post_comments WHERE id = ?";
      connection.query(query, [commentId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const postId = comment.post_id;

    // 댓글 삭제 쿼리 실행
    const deleteLikesQuery = "DELETE FROM likes WHERE comment_id = ?";
    const deleteCommentQuery = "DELETE FROM post_comments WHERE id = ?";
    try {
      // 먼저 관련된 좋아요 데이터 삭제
      await new Promise((resolve, reject) => {
        connection.query(deleteLikesQuery, [commentId], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      // 댓글 데이터 삭제
      await new Promise((resolve, reject) => {
        connection.query(deleteCommentQuery, [commentId], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }

    // posts 테이블의 comment_count 감소
    const updateCommentCountQuery = `
      UPDATE posts SET comment_count = comment_count - 1 WHERE id = ?
    `;
    await new Promise((resolve, reject) => {
      connection.query(updateCommentCountQuery, [postId], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // 파일 삭제 처리
    if (comment.file_url) {
      const filePath = path.join(
        __dirname,
        "../client/public/img/commentImg",
        comment.file_url
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "댓글 삭제 중 오류가 발생했습니다." });
  }
});

// ================================== likes ======================================

// POST like toggle
app.post("/api/likes/toggle", async (req, res) => {
  const { userId, postId, curatorPostId, commentId } = req.body;
  let query = "";
  let idValue = null;

  // 요청에 따라 likes 테이블에서 어떤 컬럼을 사용할지 결정
  if (postId) {
    query = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";
    idValue = postId;
  } else if (curatorPostId) {
    query = "SELECT * FROM likes WHERE user_id = ? AND curator_post_id = ?";
    idValue = curatorPostId;
  } else if (commentId) {
    query = "SELECT * FROM likes WHERE user_id = ? AND comment_id = ?";
    idValue = commentId;
  }

  try {
    // 좋아요 상태 확인
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [userId, idValue], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    let isLiked;
    let incrementValue;

    if (result.length > 0) {
      // 좋아요가 이미 존재하면 삭제 (unlike)
      await new Promise((resolve, reject) => {
        connection.query(
          "DELETE FROM likes WHERE id = ?",
          [result[0].id],
          (error) => {
            if (error) return reject(error);
            resolve();
          }
        );
      });
      isLiked = false;
      incrementValue = -1; // 좋아요 감소
    } else {
      // 좋아요가 없다면 추가 (like)
      await new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO likes (user_id, post_id, curator_post_id, comment_id) VALUES (?, ?, ?, ?)",
          [userId, postId, curatorPostId, commentId],
          (error) => {
            if (error) return reject(error);
            resolve();
          }
        );
      });
      isLiked = true;
      incrementValue = 1; // 좋아요 증가
    }

    // 해당 테이블의 like_count 업데이트
    let updateQuery = "";
    if (postId) {
      updateQuery = "UPDATE posts SET like_count = like_count + ? WHERE id = ?";
    } else if (curatorPostId) {
      updateQuery =
        "UPDATE curator_posts SET like_count = like_count + ? WHERE id = ?";
    } else if (commentId) {
      updateQuery =
        "UPDATE post_comments SET like_count = like_count + ? WHERE id = ?";
    }

    if (updateQuery) {
      await new Promise((resolve, reject) => {
        connection.query(updateQuery, [incrementValue, idValue], (error) => {
          if (error) return reject(error);
          resolve();
        });
      });
    }

    res.status(200).json({ isLiked });
  } catch (error) {
    console.error("Error toggling like status:", error);
    res.status(500).json({ message: "Error toggling like status" });
  }
});






// Express에 정적 파일 제공 추가
app.use(
  "/profileImg",
  express.static(path.join(__dirname, "../client/public/img/profileImg"))
);
app.use(
  "/postImg",
  express.static(path.join(__dirname, "../client/public/img/postImg"))
);
app.use(express.static(path.join(__dirname, "../client")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// app.use(express.static(path.join(__dirname, "../public_html")));

// // 모든 요청을 public_html 폴더의 index.html로 리다이렉트
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public_html", "index.html"));
// });

app.listen(port, () => console.log(`listening ${port}`));
