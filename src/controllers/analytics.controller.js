const {
  getSummaryAnalytics,
  getDailyAnalytics,
  getTopPagesAnalytics,
  getEventTypeBreakdown,
  getFunnelAnalytics,
} = require("../services/analytics.service");
const { sendSuccess } = require("../utils/api-response");

const summaryAnalytics = async (req, res, next) => {
  try {
    const data = await getSummaryAnalytics();
    return sendSuccess(res, "Summary analytics fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

const dailyAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, eventType } = req.query;

    const data = await getDailyAnalytics({
      startDate,
      endDate,
      eventType,
    });

    return sendSuccess(res, "Daily analytics fetched successfully", {
      count: data.length,
      rows: data,
    });
  } catch (error) {
    next(error);
  }
};

const topPagesAnalytics = async (req, res, next) => {
  try {
    const { limit, startDate, endDate } = req.query;

    const data = await getTopPagesAnalytics({
      limit: limit || 10,
      startDate,
      endDate,
    });

    return sendSuccess(res, "Top pages fetched successfully", {
      count: data.length,
      rows: data,
    });
  } catch (error) {
    next(error);
  }
};

const eventTypeBreakdown = async (req, res, next) => {
  try {
    const data = await getEventTypeBreakdown();
    return sendSuccess(res, "Event type breakdown fetched successfully", {
      count: data.length,
      rows: data,
    });
  } catch (error) {
    next(error);
  }
};

const funnelAnalytics = async (req, res, next) => {
  try {
    const data = await getFunnelAnalytics();
    return sendSuccess(res, "Funnel analytics fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  summaryAnalytics,
  dailyAnalytics,
  topPagesAnalytics,
  eventTypeBreakdown,
  funnelAnalytics,
};
