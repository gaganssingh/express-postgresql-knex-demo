const findByLessonId = async (knex, lesson_id) => {
  // const response = await knex.from("messages").select("*").where({ lesson_id });
  // return response;

  const response = await knex("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as lessonID",
      "l.name as lessonName",
      "m.id as messageId",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id });
  return response;
};

const addMessage = async (knex, message) => {
  const response = await knex("messages")
    .insert(message)
    .where({ lesson_id: message.lesson_id });
  return response;
};

const removeMessage = async (knex, id) => {
  const response = await knex("messages").del().where({ id });
  return response;
};

module.exports = {
  addMessage,
  findByLessonId,
  removeMessage,
};
