const router = require("express").Router();
const controller = require("./listing.controller");
const upload = require("../../../shared/middlewares/upload.middleware");

router.post(
  "/",
  upload.array("listing_images", 10),
  controller.create
);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.put(
  "/:id",
  upload.array("listing_images", 10),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;