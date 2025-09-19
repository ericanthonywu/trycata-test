const redis = require("redis");
const loggerUtil = require("../../util/loggerUtil");
const { env } = require("../env");
new env();
const redisClient = redis
  .createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  })
  .on("error", (err) => {
    loggerUtil.error("Redis error:", err);
  });

module.exports = redisClient;
