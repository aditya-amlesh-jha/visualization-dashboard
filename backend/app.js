const express = require("express")
const app = express()
const getLogger = require("./utils/logger.js")
const logger = getLogger();

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    logger.info(`Server started on port ${PORT}`);
})