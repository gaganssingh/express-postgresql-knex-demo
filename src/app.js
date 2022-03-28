const express = require("express");
const lessonsRouter = require("./routes/lessons.router");
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use(`/api/lessons`, lessonsRouter);

//
module.exports = app;
