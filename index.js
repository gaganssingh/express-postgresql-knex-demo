const express = require("express");
const res = require("express/lib/response");
const app = express();

app.get("/", (req, res) => res.json({ hello: "world" }));

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ [SERVER] Listening on port: ${PORT}`));
