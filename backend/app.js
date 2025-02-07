const express = require("express")
const promClient = require("prom-client")
const responseTime = require("response-time")
const router = require("./routes/routes.js")
const loggerMiddleware = require("./middleware/logger-middleware.js")
const getLogger = require("./utils/logger.js")
const app = express()
const logger = getLogger();

const PORT = process.env.PORT || 8080;

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0,1,2,3,4,5]
});

app.use(
    responseTime((req, res, time) => {
        
        // exclude the metrics api  url
        if(req.originalUrl === "/metrics"){
            return
        }

        // route is valid, not some random like 404
        if(req.route){
            httpRequestDurationMicroseconds
                .labels(req.method, req.route.path, res.statusCode)
                .observe(time/1000);
        }

    })
);

app.use(loggerMiddleware);
app.use(router);

app.get("/metrics", async (req, res)=>{
    res.set("Content-type", promClient.register.contentType);
    res.end(await promClient.register.metrics());
})

app.listen(PORT, ()=>{
    logger.info(`Server started on port :: ${PORT}`);
})