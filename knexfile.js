const path = require("path");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/connection/lessons.sb3",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    useNullAsDefault: true, // unique to sqlite3
  },
};
