const { eventSchema } = require("../validators/event.validator");
const { enqueueEvent } = require("../services/event.service");

const ingestEvent = async (req, res, next) => {
  try {
    const validatedData = eventSchema.parse(req.body);

    const result = await enqueueEvent(validatedData);

    return res.status(202).json({
      success: true,
      message: "Event accepted for asynchronous processing",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ingestEvent,
};
