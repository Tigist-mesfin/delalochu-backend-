// src/server.js
const app = require("./app");
const env = require("./config/env");
const { initDB, sequelize } = require("./database");

const PORT = env.PORT;

let server;

async function startServer() {
  await initDB();

  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

function gracefulShutdown() {
  console.log("📴 Shutting down gracefully...");
  server.close(async () => {
    console.log("💤 HTTP server closed");
    try {
      await sequelize.close();
      console.log("📦 Database connection closed");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error closing DB:", err);
      process.exit(1);
    }
  });

  // Force exit if graceful shutdown hangs
  setTimeout(() => {
    console.error("⏰ Forced exit after timeout");
    process.exit(1);
  }, 10000);
}

module.exports = startServer;
