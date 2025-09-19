const knex = require("knex");
const { env } = require("../env");
const loggerUtil = require("../../util/loggerUtil");
new env();
module.exports = knex({
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  log: {
    warn: (message) => {
      loggerUtil.warn(message);
    },
    error: (message) => {
      loggerUtil.error(message);
    },
  },
  debug: process.env.DB_DEBUG,
});
