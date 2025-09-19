const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const http = require("http");
const rTracer = require("cls-rtracer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { env } = require("./src/config/env");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const loggerUtil = require("./src/util/loggerUtil");
const db = require("./src/config/database/sanitazion");
const redis = require("./src/config/redis/redis_config");
const { slackAlertUtil } = require("./src/util/slackAlertUtil");
const cron = require("./src/cron/cron");

(async () => {
  try {
    const app = express();
    app.use(
      cors({
        origin: "*",
      }),
    );

    app.use(helmet());

    await Promise.all([new env().validate(), db.check()]);

    await redis.connect();

    app.use(rTracer.expressMiddleware());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(logger("dev"));

    cron();

    app.use(express.json());
    app.use("/api/", require("./src/routes/index"));

    app.use(errorMiddleware);

    const server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      loggerUtil.info("listening on port " + process.env.PORT);
      slackAlertUtil(
        `backend ${process.env.NODE_ENV} is listening on port ${process.env.PORT}`,
      );
    });
  } catch (e) {
    loggerUtil.error(
      `Failed to listen on port: ${process.env.PORT} ${e} stack: ${e.stack}`,
    );
    slackAlertUtil(`Failed to listen on port: ${process.env.PORT} ${e}`);
  }
})();
