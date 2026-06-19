const express = require("express");
const router = express.Router();

const controller = require("./listingCategory.controller");
const validator = require("./listingCategory.validation");

// simple middleware
const validate =
  (schema) =>
  (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };

router.post(
  "/",
  validate(validator.createListingCategory),
  controller.create
);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.put(
  "/:id",
  validate(validator.updateListingCategory),
  controller.update
);

router.delete("/:id", controller.delete);

module.exports = router;