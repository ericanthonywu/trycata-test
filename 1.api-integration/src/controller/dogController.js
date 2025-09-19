const openWeatherService = require("../service/dogService");

exports.sync = async (req, res, next) => {
  try {
    await openWeatherService.sync();
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

exports.items = async (req, res, next) => {
  try {
    const data = await openWeatherService.get();

    res.json({
      data,
    });
  } catch (e) {
    next(e);
  }
};
