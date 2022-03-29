const express = require("express");
const lessonsRouter = require("./routes/lessons.router");
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use(`/api/lessons`, lessonsRouter);

//
module.exports = app;
