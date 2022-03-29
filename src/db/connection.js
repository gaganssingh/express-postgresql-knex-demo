const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knexInstance = require("knex")(config);

module.exports = knexInstance;
