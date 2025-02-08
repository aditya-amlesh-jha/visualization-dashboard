const responseTime = require("response-time");
const { httpRequestDurationMicroseconds } = require("../utils/prometheus.js");

const excludedRoutes = ["/metrics"];

const measureTime = responseTime((req, res, time) => {
    // Exclude the metrics API and other defined routes
    if (excludedRoutes.includes(req.originalUrl)) {
        return;
    }

    // Ensure the route exists (not a 404)
    if (req.route) {
        res.on("finish", () => {
            httpRequestDurationMicroseconds
                .labels(req.method, req.route.path, res.statusCode)
                .observe(time / 1000);
        });
    }
});

module.exports = measureTime;
