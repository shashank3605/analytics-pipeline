require("dotenv").config();

const app = require("./app");
const prisma = require("./config/db");
const redisConnection = require("./config/redis");
const logger = require("./config/logger");
const { analyticsQueue, queueName } = require("./queues/analytics.queue");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("PostgreSQL connected successfully");

    await redisConnection.ping();
    logger.info("Redis connected successfully");

    await analyticsQueue.waitUntilReady();
    logger.info(`BullMQ queue is ready: ${queueName}`);

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error({
      message: "Failed to start server",
      error: error.message,
    });
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  logger.info("Shutting down gracefully...");
  await prisma.$disconnect();
  await redisConnection.quit();
  process.exit(0);
});
