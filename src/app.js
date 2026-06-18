// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const { sequelize } = require("./config/db");

const modules = require("./modules");
const errorHandler = require("./shared/middlewares/error.middleware");

const app = express();

const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use(express.json());

// CORS
const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan("dev"));

// API routes
app.use("/api/users", modules.userRouter);
app.use("/api/staff", modules.staffRouter);
app.use("/api/staff-roles", modules.staffRoleRouter);
app.use("/api/staff-permissions", modules.staffPermissionRouter);
app.use("/api/clients", modules.clientRouter);
app.use("/api/brokers", modules.brokerRouter);
app.use("/api/broker-reviews", modules.brokerReviewRouter);
app.use("/api/auth", modules.authRouter);


// Health check
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "OK", db: "connected" });
  } catch {
    res.status(503).json({ status: "ERROR", db: "disconnected" });
  }
});

// 404 handler (if no route matched)
app.use((req, res, next) => {
  const AppError = require("./shared/errors/AppError");
  next(AppError.notFound(`Route ${req.originalUrl} not found`));
});

// Global error handler – MUST be last
app.use(errorHandler);

module.exports = app;
