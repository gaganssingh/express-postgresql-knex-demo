const express = require("express");
const res = require("express/lib/response");
const shortid = require("shortid");
const app = express();

// MIDDLEWARES
app.use(express.json());

const channels = [];
const lessons = [];

app.get("/", (req, res) => res.json({ hello: "world" }));

// -------------------
//     channels
// -------------------

app.get(`/api/channels`, (req, res) => {
  res.status(200).json(channels);
});

app.post(`/api/channels`, (req, res) => {
  const channelInfo = req.body;

  const newChannel = {
    id: shortid.generate(),
    ...channelInfo,
  };

  channels.push(newChannel);

  res.status(201).json(newChannel);
});

// -------------------
//     lessons
// -------------------
app.get(`/api/lessons`, (req, res) => {
  res.status(200).json(lessons);
});

app.post(`/api/lessons`, (req, res) => {
  const lessonInfo = req.body;

  const newLesson = {
    id: shortid.generate(),
    ...lessonInfo,
  };
  lessons.push(newLesson);
  res.status(201).json(newLesson);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ [SERVER] Listening on port: ${PORT}`));
