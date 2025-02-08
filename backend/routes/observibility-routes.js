const express = require("express");
const router = express.Router();
const {client: promClient} = require("../utils/prometheus.js")

router.get("/metrics", async (req, res)=>{
    res.set("Content-type", promClient.register.contentType);
    res.end(await promClient.register.metrics());
})

module.exports = router;