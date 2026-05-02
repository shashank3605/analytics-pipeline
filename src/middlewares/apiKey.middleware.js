function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.EVENT_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Invalid or missing API key",
    });
  }

  next();
}

module.exports = apiKeyMiddleware;
