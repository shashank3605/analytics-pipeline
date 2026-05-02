const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/event.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const healthRoutes = require("./routes/health.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/not-found.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api", eventRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
