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

const authenticateToken = (req, res, next) => {
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
    const query = `
      INSERT INTO artlove1_art_lover.users (nickname, email, password, birthday, profile_image, role)
      VALUES (?, ?, ?, ?, "", "general")
    `;
    connection.query(
      query,
      [nickname, email, hashedPassword, birthday, profile_image, role],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send("Error registering user");
        }
        res.status(201).send("User registered successfully");
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
app.get("/api/auth/status", authenticateToken, (req, res) => {
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

app.get("/api/curatorPosts/list", (req, res) => {
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

// 최신 큐레이터 게시물 3개 가져오기 (큐레이터 이름 포함)
app.get("/api/curatorPosts/recent", (req, res) => {
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

app.get("/curatorPosts", (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const offset = (page - 1) * limit;

  const query = `
    SELECT cp.id, cp.title, cp.content, cp.like_count, cp.comment_count, cp.created_at, u.nickname AS curator_name 
    FROM artlove1_art_lover.curator_posts cp 
    INNER JOIN artlove1_art_lover.users u ON cp.curator_id = u.id
    ORDER BY cp.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(
    query,
    [parseInt(limit), parseInt(offset)],
    (err, results) => {
      if (err) {
        console.error("Error fetching curator posts:", err);
        return res.status(500).json({
          message: "서버 에러로 인해 큐레이터 글을 불러오지 못했습니다.",
        });
      }

      // Sending back the results as an array of posts
      res.status(200).json(results);
    }
  );
});

// Get curator post by id
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


// 유저 정보 업데이트 (마이페이지 수정)
app.put("/api/mypage/:id", authenticateToken, (req, res) => {
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/profileImg"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// 프로필 이미지 업로드
app.post(
  "/api/upload/avatar/:id",
  authenticateToken,
  upload.single("avatar"),
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
      const filePath = `/profileImg/${req.user.id}-${Date.now()}.jpeg`; // 압축된 파일은 JPEG로 저장

      try {
        // Sharp를 사용하여 이미지 압축 및 최적화
        await sharp(req.file.path)
          .resize(500, 500, {
            fit: sharp.fit.cover,
          }) // 500x500으로 리사이즈
          .jpeg({ quality: 70 }) // JPEG로 변환하고 품질 70%로 설정
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


// Express 서버 예시 코드
app.post("/api/uploadCuratorPosts", (req, res) => {
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



// Express에 정적 파일 제공 추가
app.use(
  "/profileImg",
  express.static(path.join(__dirname, "../client/public/profileImg"))
);

app.use(express.static(path.join(__dirname, "../client")));

// 모든 요청을 public_html 폴더의 index.html로 리다이렉트
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});



// app.use(express.static(path.join(__dirname, "../public_html")));

// // 모든 요청을 public_html 폴더의 index.html로 리다이렉트
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public_html", "index.html"));
// });

app.listen(port, () => console.log(`listening ${port}`));
