const channels = [];
const lessons = [];

app.get("/", (req, res) => res.json({ hello: "world" }));

// -------------------
//     channels
// -------------------
app
  .route(`/api/channels`)
  .get((req, res) => {
    res.status(200).json(channels);
  })
  .post((req, res) => {
    const channelInfo = req.body;

    const newChannel = {
      id: shortid.generate(),
      ...channelInfo,
    };

    channels.push(newChannel);

    res.status(201).json(newChannel);
  });

app
  .route(`/api/channels/:id`)
  .get((req, res) => {
    const { id } = req.params;
    const channel = channels.find((ch) => ch.id === id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.status(200).json(channel);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const channelIndex = channels.findIndex((ch) => ch.id === id);
    if (channelIndex === -1) {
      return res.status(404).json({ error: "Channel not found" });
    }

    channels.splice(channelIndex, 1);
    res.status(204).end();
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, lessonId, cohort } = req.body;
    const channelIndex = channels.findIndex((ch) => ch.id === id);
    if (channelIndex === -1) {
      return res.status(404).json({ error: "Channel not found" });
    }
    channels[channelIndex] = {
      ...channels[channelIndex],
      ...req.body,
    };

    res.status(200).json(channels[channelIndex]);
  });

// -------------------
//     lessons
// -------------------
app
  .route(`/api/lessons`)
  .get((req, res) => {
    res.status(200).json(lessons);
  })
  .post((req, res) => {
    const lessonInfo = req.body;

    const newLesson = {
      id: shortid.generate(),
      ...lessonInfo,
    };
    lessons.push(newLesson);
    res.status(201).json(newLesson);
  });

app
  .route(`/api/lessons/:id`)
  .get((req, res) => {
    const { id } = req.params;
    const lesson = lessons.find((lsn) => lsn.id === id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json(lesson);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const lessonIndex = lessons.findIndex((lsn) => lsn.id === id);
    if (lessonIndex === -1) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    lessons.splice(lessonIndex, 1);
    res.status(204).end();
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const lesson = lessons.find((lsn) => lsn.id === id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    lesson.name = name;
    res.status(200).json(lesson);
  });
