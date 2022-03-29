require("dotenv").config();
const path = require("path");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // development: {
  //   client: "sqlite3",
  //   useNullAsDefault: true, // unique to sqlite3
  //   connection: {
  //     filename: "./src/db/connection/lessons.sb3",
  //   },
  //   migrations: {
  //     directory: path.join(__dirname, "src", "db", "migrations"),
  //   },
  //   pool: {
  //     // Enfore foreign key relationships
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done);
  //     },
  //   },
  // },
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DEV_DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
};
