require('dotenv').config();
const config = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  debug: process.env.DB_DEBUG,
};
console.log(config);
module.exports = config;