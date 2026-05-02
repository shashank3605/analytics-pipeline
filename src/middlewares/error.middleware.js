const { ZodError } = require("zod");
const logger = require("../config/logger");
const { sendError } = require("../utils/api-response");

const errorMiddleware = (err, req, res, next) => {
  logger.error({
    message: err.message || "Unhandled error",
    stack: err.stack,
  });

  if (err instanceof ZodError) {
    return sendError(
      res,
      "Validation failed",
      err.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
      400
    );
  }

  return sendError(
    res,
    err.message || "Internal server error",
    null,
    err.statusCode || 500
  );
};

module.exports = errorMiddleware;
