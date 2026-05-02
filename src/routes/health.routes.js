const express = require("express");
const {
  appHealth,
  dbHealth,
  redisHealth,
} = require("../controllers/health.controller");

const router = express.Router();

router.get("/", appHealth);
router.get("/db", dbHealth);
router.get("/redis", redisHealth);

module.exports = router;
