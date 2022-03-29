const express = require("express");
const knex = require("../db/connection");
const UsersService = require("../services/users.service");
const bcrypt = require("bcryptjs");

const usersRouter = express.Router();

usersRouter
  .route(`/register`)
  .get(async (req, res) => {
    try {
      const users = await UsersService.findAllUsers(knex);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !username.length) {
      return res.status(400).json({ error: "username field is required" });
    }
    if (!password || !password.length) {
      return res.status(400).json({ error: "password field is required" });
    }
    if (password.length < 6 || password.length > 35) {
      return res
        .status(400)
        .json({ error: "password must be between 6 and 35 characters" });
    }

    try {
      // HASH PASSWORD BEFORE SAVING TO DB
      const hashedPassword = bcrypt.hashSync(password, 12);

      const newUser = { username, password: hashedPassword };
      const user = await UsersService.addUser(knex, newUser);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });

usersRouter.route(`/login`).post(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !username.length) {
    return res.status(400).json({ error: "username field is required" });
  }
  if (!password || !password.length) {
    return res.status(400).json({ error: "password field is required" });
  }

  try {
    const user = await UsersService.findUserByUsername(knex, username);
    if (!user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ error: "unauthorized access" });
    }

    return res.status(200).json({
      message: "successfully logged in",
      user: user.username,
    });
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
