const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");

const authMiddleware = require("../../../shared/middlewares/auth.middleware");

/**
 * AUTH ROUTES
 */

// LOGIN
router.post("/login", authController.login);

// REFRESH TOKEN
router.post("/refresh-token", authController.refreshToken);

// LOGOUT (protected)
router.post("/logout", authMiddleware, authController.logout);

// FORGOT PASSWORD
router.post("/forgot-password", authController.forgotPassword);

// VERIFY RESET OTP
router.post("/verify-reset-otp", authController.verifyResetOtp);

// RESET PASSWORD
router.post("/reset-password", authController.resetPassword);

module.exports = router;