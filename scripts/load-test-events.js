const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/events";

const eventTypes = ["page_view", "button_click", "signup", "login", "purchase"];

const pages = ["/", "/home", "/pricing", "/about", "/checkout", "/dashboard"];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buildEvent = (index) => {
  const eventType = randomItem(eventTypes);

  return {
    eventType,
    userId: `user_${Math.ceil(Math.random() * 20)}`,
    sessionId: `session_${Math.ceil(Math.random() * 50)}`,
    pageUrl: eventType === "page_view" ? randomItem(pages) : undefined,
    metadata: {
      device: Math.random() > 0.5 ? "mobile" : "desktop",
      browser: Math.random() > 0.5 ? "chrome" : "safari",
      source: "seed-script",
      batchIndex: index,
    },
    timestamp: new Date().toISOString(),
  };
};

const run = async () => {
  const total = 50;

  for (let i = 1; i <= total; i++) {
    try {
      const payload = buildEvent(i);
      const response = await axios.post(BASE_URL, payload);
      console.log(`✅ Event ${i} queued`, response.data.data);
    } catch (error) {
      console.error(
        `❌ Event ${i} failed`,
        error.response?.data || error.message
      );
    }
  }

  console.log("Done sending seed events");
};

run();
