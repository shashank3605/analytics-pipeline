require("dotenv").config();

const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const { processEventBatch } = require("../services/batchAnalytics.service");
const logger = require("../config/logger");

let batch = [];
let timer = null;

const BATCH_SIZE = 100;
const FLUSH_INTERVAL_MS = 1000;

function addToBatch(job) {
  return new Promise((resolve, reject) => {
    batch.push({ job, resolve, reject });

    if (batch.length >= BATCH_SIZE) {
      flushBatch();
    } else if (!timer) {
      timer = setTimeout(flushBatch, FLUSH_INTERVAL_MS);
    }
  });
}

async function flushBatch() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  if (batch.length === 0) return;

  const currentBatch = batch;
  batch = [];

  try {
    await processEventBatch(currentBatch.map((item) => item.job.data));
    currentBatch.forEach((item) => item.resolve({ success: true }));

    logger.info({ count: currentBatch.length }, "Batch processed successfully");
  } catch (error) {
    currentBatch.forEach((item) => item.reject(error));
    logger.error({ error: error.message }, "Batch processing failed");
  }
}

const worker = new Worker(
  process.env.QUEUE_NAME,
  async (job) => addToBatch(job),
  {
    connection: redisConnection,
    concurrency: 25,
  }
);

worker.on("ready", () => {
  logger.info("Analytics batch worker started");
});

worker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, error: err.message }, "Job failed");
});

process.on("SIGINT", async () => {
  logger.info("Closing analytics worker...");
  await flushBatch();
  await worker.close();
  process.exit(0);
});
