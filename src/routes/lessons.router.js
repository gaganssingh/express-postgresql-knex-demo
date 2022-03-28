const express = require("express");
const LessonsService = require("../services/lessons.service");
const MessagesService = require("../services/messages.service");
const knex = require("../db/connection");
const lessonsRouter = express.Router();

lessonsRouter
  .route(`/`)
  .get(async (req, res) => {
    const response = await LessonsService.find(knex);
    res.status(200).json(response);
  })
  .post((req, res) => {
    LessonsService.add(knex, req.body)
      .then((lesson) => res.status(201).json(lesson))
      .catch((error) => res.status(500).json({ message: "cannot add lesson" }));
  });

lessonsRouter
  .route(`/:id`)
  .get(async (req, res) => {
    const response = await LessonsService.findById(knex, req.params.id);
    if (!response) {
      return res.status(404).json({ error: "lesson not found" });
    }
    res.status(200).json(response);
  })
  .delete(async (req, res) => {
    const response = await LessonsService.remove(knex, req.params.id);
    if (!response) {
      return res.status(404).json({ error: "lesson not found" });
    }
    res.status(200).end();
  })
  .patch(async (req, res) => {
    const response = await LessonsService.update(knex, req.params.id, req.body);
    if (!response) {
      return res.status(404).json({ error: "lesson not found" });
    }
    res.status(200).json(response);
  });

// ----------------------------------
//        messages
// ----------------------------------
lessonsRouter
  .route(`/:id/messages`)
  .get(async (req, res) => {
    const { id: lesson_id } = req.params;
    const messages = await MessagesService.findByLessonId(knex, lesson_id);
    res.status(200).json(messages);
  })
  .post(async (req, res) => {
    const { sender, text } = req.body;
    const { id: lesson_id } = req.params;

    const findLesson = await LessonsService.findById(knex, lesson_id);
    if (!findLesson) {
      return res.status(404).json({ error: "lesson not found" });
    }

    const newMessage = {
      sender,
      text,
      lesson_id,
    };
    const message = await MessagesService.addMessage(knex, newMessage);
    res.status(201).json(message);
  });

lessonsRouter
  .route(`/:lesson_id/messages/:id`)
  .delete(async (req, res) => {
    const response = await MessagesService.removeMessage(knex, req.params.id);
    if (!response) {
      return res.status(404).json({ error: "message not found" });
    }
    res.status(204).end();
  })
  .patch(async (req, res) => {});

module.exports = lessonsRouter;
