const prisma = require("../config/db");
const logger = require("../config/logger");

const logFailedEvent = async ({
  ingestionId,
  payload,
  errorMessage,
  retryCount,
}) => {
  try {
    await prisma.eventFailure.create({
      data: {
        ingestionId,
        payload,
        errorMessage,
        retryCount,
      },
    });

    logger.error({
      message: "Final failed event stored in database",
      ingestionId,
      retryCount,
    });
  } catch (dbError) {
    logger.error({
      message: "Failed to store failed event in database",
      ingestionId,
      dbError: dbError.message,
    });
  }
};

module.exports = {
  logFailedEvent,
};
