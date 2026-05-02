const rateLimit = require("express-rate-limit");

const eventRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 500000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

module.exports = {
  eventRateLimiter,
};
