const db = require("./connection_config");
const loggerUtil = require("../../util/loggerUtil");
const { env } = require("../env");
new env();
exports.check = async () => {
  try {
    loggerUtil.info("Checking DB Connection");
    await db.raw("select 1");
    loggerUtil.info("DB Connected");
  } catch (e) {
    loggerUtil.error(`Failed to connect to database ${e}`);
    throw e;
  }
};
