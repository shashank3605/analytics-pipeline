const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const queueName = process.env.QUEUE_NAME || "analytics-event-queue";

const analyticsQueue = new Queue(queueName, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = {
  analyticsQueue,
  queueName,
};
