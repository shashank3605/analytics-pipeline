const express = require("express");
const {
  summaryAnalytics,
  dailyAnalytics,
  topPagesAnalytics,
  eventTypeBreakdown,
  funnelAnalytics,
} = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/summary", summaryAnalytics);
router.get("/daily", dailyAnalytics);
router.get("/top-pages", topPagesAnalytics);
router.get("/event-types", eventTypeBreakdown);
router.get("/funnel", funnelAnalytics);

module.exports = router;
