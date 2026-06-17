const service = require("./broker.service");

const {
  createBroker,
  updateBroker,
} = require("./broker.validation");

class BrokerController {
  async create(req, res, next) {
    try {
      const { error } = createBroker.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const broker = await service.create(req.body);

      res.status(201).json(broker);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const brokers = await service.getAll();

      res.json(brokers);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const broker = await service.getById(req.params.id);

      if (!broker) {
        return res.status(404).json({
          message: "Broker not found",
        });
      }

      res.json(broker);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error } = updateBroker.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const broker = await service.update(
        req.params.id,
        req.body
      );

      res.json(broker);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await service.delete(req.params.id);

      res.json({
        message: "Broker deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BrokerController();