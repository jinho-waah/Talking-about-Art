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

// 회원가입
app.post("/api/register", async (req, res) => {
  const { role, email, nickname, password, birthday, profile_image } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. 사용자 정보 저장
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

        // 2. 등록된 사용자 ID 가져오기
        const userId = userResult.insertId;

        // 3. 기본 권한 설정 (사용자 등록 시 기본 권한 추가)
        const permissionsQuery = `
          INSERT INTO artlove1_art_lover.permissions (user_id, request, flag)
          VALUES (?, ?, ?)
        `;

        // 기본 role을 "general"로 설정하고 flag는 false
        connection.query(permissionsQuery, [userId, role, false], (permErr) => {
          if (permErr) {
            console.error("Error setting permissions:", permErr);
            return res.status(500).send("Error registering user permissions");
          }
          res.status(201).send("User registered successfully with permissions");
        });
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
    role: req.user.role,
    userName: req.user.userName,
    imgUrl: req.user.imgUrl,
  });
});

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
  // const query = `
  //   SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
  //          cp.like_count, u.nickname AS curator_name
  //   FROM artlove1_art_lover.curator_posts cp
  //   JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
  //   ORDER BY cp.created_at DESC
  //   LIMIT 3
  // `;
  const query = `
    SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
           cp.like_count, u.nickname AS curator_name
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

  const query = `
    SELECT cp.id, cp.curator_id, cp.show_id, cp.title, cp.content, cp.created_at, cp.updated_at,
           cp.like_count, u.nickname AS curator_name,
           s.show_name, s.show_term_start, s.show_term_end, s.show_place,
           s.show_price, s.show_link, s.show_place_detail,
           g.business_hours
    FROM artlove1_art_lover.curator_posts cp
    JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
    LEFT JOIN artlove1_art_lover.shows s ON cp.show_id = s.id
    LEFT JOIN artlove1_art_lover.galleries g ON s.gallery = g.id
    WHERE cp.id = ?
  `;

  connection.query(query, [postId], (err, results) => {
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
    cb(null, path.join(__dirname, "../client/public/img/profileImg")); // 절대 경로 사용 권장
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
      created_at, // 클라이언트에서 받은 created_at
      updated_at, // 클라이언트에서 받은 updated_at
      like_count,
      comment_count,
      imageUrl, // 단일 이미지 URL
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

// GET ordinary post list
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

// GET ordinary post by ID
app.get("/api/ordinaryPosts/:id", (req, res) => {
  const postId = req.params.id;

  const query = `
    SELECT p.id, p.author_id, p.title, p.content, p.created_at,
           p.like_count, p.comment_count, u.nickname AS author_name
    FROM artlove1_art_lover.posts p
    JOIN artlove1_art_lover.users u ON p.author_id = u.id
    WHERE p.id = ?
  `;

  connection.query(query, [postId], (err, results) => {
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

// ================================== mypage ======================================

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
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});

const uploadProfile = multer({ profileStorage });

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
            if (err) {
              console.error("이전 이미지 삭제 중 오류 발생:", err);
            }
          });
        }
      }

      // 새로운 이미지 압축 및 저장 경로
      const filePath = `/profileImg/${req.user.id}-${Date.now()}.webp`; // 압축된 파일은 JPEG로 저장

      try {
        await sharp(req.file.path)
          .resize(500, 500, {
            fit: sharp.fit.cover,
          }) // 500x500으로 리사이즈
          .webp({ quality: 70 }) // JPEG로 변환하고 품질 70%로 설정
          .toFile(path.join(__dirname, "../client/public", filePath)); // 압축된 파일 저장

        // 원래 파일 삭제
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
