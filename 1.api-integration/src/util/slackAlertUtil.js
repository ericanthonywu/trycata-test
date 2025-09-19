const axios = require("axios");
const loggerUtil = require("./loggerUtil");

exports.slackAlertUtil = (message) => {
  if (process.env.NODE_ENV !== "local") {
    axios
      .post(process.env.SLACK_WEBHOOK_URL, {
        error_message: `[backend-${process.env.NODE_ENV}] ${message}`,
      })
      .catch((error) => {
        loggerUtil.error(`fail to send to slack ${error.message}`);
      });
  }
};
