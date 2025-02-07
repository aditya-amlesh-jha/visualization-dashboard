const getLogger = require("../utils/logger.js")
const logger = getLogger();

const loggerMiddleware = async function (req, res, next){
    logger.info(`${req.method} :: ${req.url}`)
    next();
}

module.exports = loggerMiddleware;