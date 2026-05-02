const prisma = require("../config/db");

async function processEventBatch(events) {
  if (!events.length) return;

  const rawEvents = events.map((event) => ({
    ingestionId: event.ingestionId,
    eventType: event.eventType,
    userId: event.userId || null,
    sessionId: event.sessionId || null,
    pageUrl: event.pageUrl || null,
    metadata: event.metadata || {},
    eventTime: new Date(event.timestamp || Date.now()),
  }));

  await prisma.eventRaw.createMany({
    data: rawEvents,
    skipDuplicates: true,
  });

  const dailyMap = new Map();
  const pageMap = new Map();

  for (const event of events) {
    const date = new Date(event.timestamp || Date.now());
    date.setHours(0, 0, 0, 0);

    const dailyKey = `${date.toISOString()}_${event.eventType}`;
    dailyMap.set(dailyKey, {
      eventDate: date,
      eventType: event.eventType,
      count: (dailyMap.get(dailyKey)?.count || 0) + 1,
    });

    if (event.eventType === "page_view" && event.pageUrl) {
      const pageKey = `${date.toISOString()}_${event.pageUrl}`;
      pageMap.set(pageKey, {
        eventDate: date,
        pageUrl: event.pageUrl,
        count: (pageMap.get(pageKey)?.count || 0) + 1,
      });
    }
  }

  for (const item of dailyMap.values()) {
    await prisma.dailyEventStats.upsert({
      where: {
        eventDate_eventType: {
          eventDate: item.eventDate,
          eventType: item.eventType,
        },
      },
      update: {
        totalCount: {
          increment: item.count,
        },
      },
      create: {
        eventDate: item.eventDate,
        eventType: item.eventType,
        totalCount: item.count,
      },
    });
  }

  for (const item of pageMap.values()) {
    await prisma.pageStats.upsert({
      where: {
        pageUrl_eventDate: {
          pageUrl: item.pageUrl,
          eventDate: item.eventDate,
        },
      },
      update: {
        views: {
          increment: item.count,
        },
      },
      create: {
        pageUrl: item.pageUrl,
        eventDate: item.eventDate,
        views: item.count,
      },
    });
  }
}

module.exports = {
  processEventBatch,
};
