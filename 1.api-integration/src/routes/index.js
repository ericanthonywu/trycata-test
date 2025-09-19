const express = require("express");
const router = express.Router();
const openWeatherController = require("../controller/dogController");

router.post("/sync", openWeatherController.sync);
router.get("/items", openWeatherController.items);

module.exports = router;
