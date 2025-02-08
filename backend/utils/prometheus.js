const client = require("prom-client")
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0,1,2,3,4,5]
});

module.exports = {
    client, httpRequestDurationMicroseconds
}