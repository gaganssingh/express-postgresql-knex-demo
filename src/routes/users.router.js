const express = require("express");
const knex = require("../db/connection");
const UsersService = require("../services/users.service");

const usersRouter = express.Router();

usersRouter.route(`/`).get(async (req, res) => {
  try {
    const users = await UsersService.findAllUsers(knex);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

usersRouter.route(`/:username`).get(async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UsersService.findUserByUsername(knex, username);
    if (!user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = usersRouter;
