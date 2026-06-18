// src/config/env.js
require("dotenv").config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD || '',

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET, 

  // CORS
  GEEZ_SMS_URL: process.env.GEEZ_SMS_URL,
  GEEZ_SMS_TOKEN: process.env.GEEZ_SMS_TOKEN,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '*',
};

// Quick validation for required values
const required = ['DB_NAME', 'DB_USER', 'JWT_SECRET'];
for (const key of required) {
  if (!env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

module.exports = env;