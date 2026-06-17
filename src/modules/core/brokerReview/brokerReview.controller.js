const service = require("./brokerReview.service");

const {
  createReview,
  updateReview,
} = require("./brokerReview.validation");

class BrokerReviewController {
  async create(req, res, next) {
    try {
      const { error } = createReview.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const review = await service.create(req.body);

      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const reviews = await service.getAll();

      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const review = await service.getById(req.params.id);

      if (!review) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      res.json(review);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error } = updateReview.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const review = await service.update(
        req.params.id,
        req.body
      );

      res.json(review);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await service.delete(req.params.id);

      res.json({
        message: "Review deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BrokerReviewController();