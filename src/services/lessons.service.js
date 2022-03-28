const find = async (knex) => {
  const response = await knex.select("*").from("lessons");
  return response;
};

const add = async (knex, lesson) => {
  console.log("Add lesson");
  const [id] = await knex("lessons").insert(lesson);
  return id;
};

const findById = async (knex, id) => {
  const response = await knex.select("*").from("lessons").where({ id }).first();
  return response;
};

const remove = async (knex, id) => {
  const response = await knex.from("lessons").del().where({ id });
  return response;
};

const update = async (knex, id, lessonUpdates) => {
  await knex.from("lessons").where({ id }).update(lessonUpdates);

  const response = await findById(knex, id);
  return response;
};

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
};
