// const prisma = require("../config/db");
// const logger = require("../config/logger");
// const { getStartOfDayUTC } = require("../utils/date");

// const processAnalyticsEvent = async (jobData) => {
//   const {
//     ingestionId,
//     eventType,
//     userId,
//     sessionId,
//     pageUrl,
//     metadata,
//     eventTime,
//   } = jobData;

//   const parsedEventTime = new Date(eventTime);
//   const eventDate = getStartOfDayUTC(parsedEventTime);

//   logger.info({
//     message: "Processing analytics event",
//     ingestionId,
//     eventType,
//   });

//   await prisma.$transaction(async (tx) => {
//     await tx.eventRaw.create({
//       data: {
//         ingestionId,
//         eventType,
//         userId,
//         sessionId,
//         pageUrl,
//         metadata,
//         eventTime: parsedEventTime,
//       },
//     });

//     await tx.dailyEventStats.upsert({
//       where: {
//         eventDate_eventType: {
//           eventDate,
//           eventType,
//         },
//       },
//       update: {
//         totalCount: {
//           increment: 1,
//         },
//       },
//       create: {
//         eventDate,
//         eventType,
//         totalCount: 1,
//       },
//     });

//     if (eventType === "page_view" && pageUrl) {
//       await tx.pageStats.upsert({
//         where: {
//           pageUrl_eventDate: {
//             pageUrl,
//             eventDate,
//           },
//         },
//         update: {
//           views: {
//             increment: 1,
//           },
//         },
//         create: {
//           pageUrl,
//           eventDate,
//           views: 1,
//         },
//       });
//     }
//   });

//   logger.info({
//     message: "Analytics event processed successfully",
//     ingestionId,
//     eventType,
//   });

//   return true;
// };

// module.exports = {
//   processAnalyticsEvent,
// };

const prisma = require("../config/db");
const logger = require("../config/logger");
const { getStartOfDayUTC } = require("../utils/date");

const processAnalyticsEvent = async (jobData) => {
  const {
    ingestionId,
    eventType,
    userId,
    sessionId,
    pageUrl,
    metadata,
    eventTime,
  } = jobData;

  if (metadata?.forceFail === true) {
    throw new Error("Forced failure for retry testing");
  }

  const parsedEventTime = new Date(eventTime);
  const eventDate = getStartOfDayUTC(parsedEventTime);

  logger.info({
    message: "Processing analytics event",
    ingestionId,
    eventType,
  });

  await prisma.$transaction(async (tx) => {
    await tx.eventRaw.create({
      data: {
        ingestionId,
        eventType,
        userId,
        sessionId,
        pageUrl,
        metadata,
        eventTime: parsedEventTime,
      },
    });

    await tx.dailyEventStats.upsert({
      where: {
        eventDate_eventType: {
          eventDate,
          eventType,
        },
      },
      update: {
        totalCount: {
          increment: 1,
        },
      },
      create: {
        eventDate,
        eventType,
        totalCount: 1,
      },
    });

    if (eventType === "page_view" && pageUrl) {
      await tx.pageStats.upsert({
        where: {
          pageUrl_eventDate: {
            pageUrl,
            eventDate,
          },
        },
        update: {
          views: {
            increment: 1,
          },
        },
        create: {
          pageUrl,
          eventDate,
          views: 1,
        },
      });
    }
  });

  logger.info({
    message: "Analytics event processed successfully",
    ingestionId,
    eventType,
  });

  return true;
};

module.exports = {
  processAnalyticsEvent,
};
