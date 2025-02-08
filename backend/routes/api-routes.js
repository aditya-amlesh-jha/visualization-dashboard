const express = require("express");
const router = express.Router();
const {
    slowRequest,
    fastRequest,
    errorRequest,
    rouletteRequest
} = require("../controller/controller.js")

router.get("/slow", slowRequest);
router.get("/fast", fastRequest);
router.get("/error", errorRequest);
router.get("/roulette", rouletteRequest);

module.exports = router;