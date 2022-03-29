const addUser = async (knex, user) => {
  const response = await knex.insert(user).into("users").returning("*");
  return response;
};

const findAllUsers = async (knex) => {
  const response = await knex.select("*").from("users");
  return response;
};

const findUserByUsername = async (knex, username) => {
  const response = await knex
    .from("users")
    .select("*")
    .where({ username })
    .first();
  return response;
};

module.exports = { addUser, findAllUsers, findUserByUsername };
