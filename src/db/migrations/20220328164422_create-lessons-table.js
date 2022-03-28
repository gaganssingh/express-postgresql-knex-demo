exports.up = function (knex) {
  return knex.schema
    .createTable("lessons", (table) => {
      table.increments(); // Auto id
      table.text("name", 128).notNullable();
      table.timestamps(true, true);
    })
    .createTable("messages", (table) => {
      table.increments();
      table.string("sender").notNullable().index();
      table.text("text").notNullable(), table.timestamps(true, true);

      // Foreign key references the lessons table's id field
      table
        .integer("lesson_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("lessons")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages").dropTableIfExists("lessons");
};
