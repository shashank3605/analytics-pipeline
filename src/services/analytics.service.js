const prisma = require("../config/db");

const getSummaryAnalytics = async () => {
  const totalRawEvents = await prisma.eventRaw.count();

  const grouped = await prisma.dailyEventStats.groupBy({
    by: ["eventType"],
    _sum: {
      totalCount: true,
    },
  });

  const eventCounts = {
    page_view: 0,
    button_click: 0,
    signup: 0,
    login: 0,
    purchase: 0,
  };

  for (const item of grouped) {
    eventCounts[item.eventType] = item._sum.totalCount || 0;
  }

  return {
    totalRawEvents,
    totalPageViews: eventCounts.page_view || 0,
    totalButtonClicks: eventCounts.button_click || 0,
    totalSignups: eventCounts.signup || 0,
    totalLogins: eventCounts.login || 0,
    totalPurchases: eventCounts.purchase || 0,
  };
};

const getDailyAnalytics = async ({ startDate, endDate, eventType }) => {
  const where = {};

  if (startDate || endDate) {
    where.eventDate = {};
    if (startDate) {
      where.eventDate.gte = new Date(startDate);
    }
    if (endDate) {
      where.eventDate.lte = new Date(endDate);
    }
  }

  if (eventType) {
    where.eventType = eventType;
  }

  const rows = await prisma.dailyEventStats.findMany({
    where,
    orderBy: [{ eventDate: "asc" }, { eventType: "asc" }],
  });

  return rows.map((row) => ({
    id: row.id,
    eventDate: row.eventDate,
    eventType: row.eventType,
    totalCount: row.totalCount,
  }));
};

const getTopPagesAnalytics = async ({ limit = 10, startDate, endDate }) => {
  const where = {};

  if (startDate || endDate) {
    where.eventDate = {};
    if (startDate) {
      where.eventDate.gte = new Date(startDate);
    }
    if (endDate) {
      where.eventDate.lte = new Date(endDate);
    }
  }

  const rows = await prisma.pageStats.groupBy({
    by: ["pageUrl"],
    where,
    _sum: {
      views: true,
    },
    orderBy: {
      _sum: {
        views: "desc",
      },
    },
    take: Number(limit),
  });

  return rows.map((row) => ({
    pageUrl: row.pageUrl,
    views: row._sum.views || 0,
  }));
};

const getEventTypeBreakdown = async () => {
  const grouped = await prisma.dailyEventStats.groupBy({
    by: ["eventType"],
    _sum: {
      totalCount: true,
    },
    orderBy: {
      eventType: "asc",
    },
  });

  return grouped.map((item) => ({
    eventType: item.eventType,
    totalCount: item._sum.totalCount || 0,
  }));
};

const getFunnelAnalytics = async () => {
  const grouped = await prisma.dailyEventStats.groupBy({
    by: ["eventType"],
    _sum: {
      totalCount: true,
    },
  });

  const map = {
    page_view: 0,
    signup: 0,
    login: 0,
    purchase: 0,
  };

  for (const item of grouped) {
    if (map[item.eventType] !== undefined) {
      map[item.eventType] = item._sum.totalCount || 0;
    }
  }

  return {
    pageViews: map.page_view,
    signups: map.signup,
    logins: map.login,
    purchases: map.purchase,
    conversionRates: {
      signupFromPageView:
        map.page_view > 0
          ? Number(((map.signup / map.page_view) * 100).toFixed(2))
          : 0,
      purchaseFromSignup:
        map.signup > 0
          ? Number(((map.purchase / map.signup) * 100).toFixed(2))
          : 0,
    },
  };
};

module.exports = {
  getSummaryAnalytics,
  getDailyAnalytics,
  getTopPagesAnalytics,
  getEventTypeBreakdown,
  getFunnelAnalytics,
};
