const express = require("express");
const { ingestEvent } = require("../controllers/event.controller");
const apiKeyMiddleware = require("../middlewares/apiKey.middleware");
const { eventRateLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/events", eventRateLimiter, apiKeyMiddleware, ingestEvent);

module.exports = router;
