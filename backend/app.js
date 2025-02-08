const express = require("express")
const apiRouter = require("./routes/api-routes.js")
const obsRouter = require("./routes/observibility-routes.js")
const loggerMiddleware = require("./middleware/logger-middleware.js")
const getLogger = require("./utils/logger.js")
const measureTime = require("./middleware/time-middleware.js")
const app = express()
const logger = getLogger();

const PORT = process.env.PORT || 8080;

// measure time middleware
app.use(measureTime);
app.use(loggerMiddleware);

// api middleware
app.use(apiRouter);
app.use(obsRouter);

app.listen(PORT, ()=>{
    logger.info(`Server started on port :: ${PORT}`);
})