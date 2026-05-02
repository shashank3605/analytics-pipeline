const prisma = require("../config/db");
const redisConnection = require("../config/redis");
const { sendSuccess } = require("../utils/api-response");

const appHealth = async (req, res, next) => {
  try {
    return sendSuccess(res, "Application is healthy", {
      uptimeSeconds: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    next(error);
  }
};

const dbHealth = async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return sendSuccess(res, "Database connection is healthy", {
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
};

const redisHealth = async (req, res, next) => {
  try {
    const pong = await redisConnection.ping();
    return sendSuccess(res, "Redis connection is healthy", {
      redis: pong,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  appHealth,
  dbHealth,
  redisHealth,
};
