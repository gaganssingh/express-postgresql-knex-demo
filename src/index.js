const express = require("express");
const lessonsRouter = require("./routes/lessons.router");
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.get(`/`, (req, res) => {
  res.json({ message: "I am son of Hal" });
});

app.use(`/api/lessons`, lessonsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ [SERVER] Listening on port: ${PORT}`));
