const winston = require('winston');
const LokiTransport = require("winston-loki")
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp})=>{
    return `${timestamp} : ${level} :: [ ${message} ] `
})

const options = {
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new LokiTransport(
            {
                host: process.env.LOKI_HOST_ADDR || "http://localhost:3100"
            }
        )
    ]
}

const createLogger = ()=>{
    return winston.createLogger(options)
}

// logger using singleton pattern to avoid logger creation again, share the same across entire application
// no need to worry about reflection, race condition here :)
const getLogger = (()=>{
    let logger = null;

    return () => {
        if(!logger){
            logger = createLogger();
        }
        return logger
    }
})();

module.exports = getLogger;