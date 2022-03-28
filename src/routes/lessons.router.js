const express = require("express");
const LessonsService = require("../services/lessons.service");
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

module.exports = lessonsRouter;
