const express = require("express");
// const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const requireAuth = require("./middlewares/require-auth");
const authRouter = require("./routes/auth.router");
const lessonsRouter = require("./routes/lessons.router");
const usersRouter = require("./routes/users.router");

// INITIALIZE APP
const app = express();

// const sessionConfig = {
//   name: "monster",
//   secret: process.env.COOKIE_SESSION_SECRET,
//   cookie: {
//     maxAge: 1000 * 60 * 60, // cookie valid for 1 hour
//     secure: false, // For production -> set to https only
//     httpOnly: true, // access only from html
//   },
//   resave: false,
//   saveUninitialized: true, // false in prod to make it GDPR compliant
// };
// app.use(session(sessionConfig));

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use(`/api/auth`, authRouter);
app.use(`/api/lessons`, requireAuth, lessonsRouter);
app.use(`/api/users`, requireAuth, usersRouter);

app.use("*", (err, req, res, next) => {
  res.status(400).json({ message: "Something went wrong" });
});

module.exports = app;
