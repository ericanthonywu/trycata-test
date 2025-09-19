const cron = require("node-cron");
const dogService = require("../service/dogService");

module.exports = () => {
  cron.schedule("*/15 * * * *", () => {
    dogService.sync();
  });
};
