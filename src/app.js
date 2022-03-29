const express = require("express");
const lessonsRouter = require("./routes/lessons.router");
const usersRouter = require("./routes/users.router");
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use(`/api/lessons`, lessonsRouter);
app.use(`/api/users`, usersRouter);

module.exports = app;
