const crypto = require("crypto");
const { analyticsQueue } = require("../queues/analytics.queue");
const logger = require("../config/logger");

const enqueueEvent = async (payload) => {
  const ingestionId = `evt_${crypto.randomUUID()}`;

  const normalizedPayload = {
    ingestionId,
    eventType: payload.eventType,
    userId: payload.userId || null,
    sessionId: payload.sessionId || null,
    pageUrl: payload.pageUrl || null,
    metadata: payload.metadata || null,
    eventTime: payload.timestamp
      ? new Date(payload.timestamp).toISOString()
      : new Date().toISOString(),
  };

  const job = await analyticsQueue.add("ingest-event", normalizedPayload);

  logger.info({
    message: "Event pushed to queue",
    ingestionId,
    jobId: job.id,
    eventType: normalizedPayload.eventType,
  });

  return {
    ingestionId,
    jobId: job.id,
  };
};

module.exports = {
  enqueueEvent,
};
