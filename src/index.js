const express = require("express");
const res = require("express/lib/response");
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.get(`/`, (req, res) => {
  res.json({ message: "I am son of Hal" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ [SERVER] Listening on port: ${PORT}`));
