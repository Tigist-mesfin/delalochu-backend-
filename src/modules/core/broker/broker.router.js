const express = require("express");
const router = express.Router();
const controller = require("./broker.controller");
const upload = require("../../../shared/middlewares/upload.middleware");

router.post(
  "/",
  upload.single("doc"),
  controller.create
);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.put(
  "/:id",
  upload.single("doc"),
  controller.update
);

router.delete("/:id", controller.delete);

module.exports = router;