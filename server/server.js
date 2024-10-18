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

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

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
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.header("Access-Control-Allow-Credentials", "true");
      return res
        .status(200)
        .json({ message: "로그인 성공", userId: user.id, role: user.role });
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
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "로그아웃 성공" });
});

// 로그인 상태 확인
app.get("/api/auth/status", authenticateToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
  });
});

// 유저 정보 갖고오기
app.get("/api/mypage/:id", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT role, nickname, profile_image, created_at, introduction, 
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
