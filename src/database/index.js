// src/database/index.js
const sequelize = require("../config/db");
const connectDB = require("./connection");
const env = require("../config/env");
const models = require("./models");

const initDB = async () => {
  try {
    await connectDB();

    if (env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("🔄 Database synced (DEVELOPMENT ONLY)");
    }

    console.log("🚀 Database ready");
  } catch (error) {
    console.error("❌ Database initialisation failed:", error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  models,
  initDB,
};
