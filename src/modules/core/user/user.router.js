const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const upload = require("../../../shared/middlewares/upload.middleware");

// AUTH
router.post("/register", upload.single("profile_image"), controller.register
);
router.post("/verify-phone", controller.verifyPhone);
router.post("/resend-otp", controller.resendOtp);
router.post("/login", controller.login);

// CRUD
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", upload.single("profile_image"), controller.update
);
router.delete("/:id", controller.delete);

module.exports = router;