const express = require("express");
const router = express.Router();
const controller = require("./user.controller");

// AUTH
router.post("/register", controller.register);
router.post("/verify-phone", controller.verifyPhone);
router.post("/resend-otp", controller.resendOtp);
router.post("/login", controller.login);

// CRUD
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;