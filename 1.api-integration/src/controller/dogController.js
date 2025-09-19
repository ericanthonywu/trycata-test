const dogService = require("../service/dogService");

exports.sync = async (req, res, next) => {
  try {
    await dogService.sync();
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

exports.items = async (req, res, next) => {
  try {
    const data = await dogService.get();

    res.json({
      data,
    });
  } catch (e) {
    next(e);
  }
};
