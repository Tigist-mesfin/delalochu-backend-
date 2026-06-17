const service = require("./staffPermission.service");
const {
  createPermission,
  updatePermission,
} = require("./staffPermission.validation");

class StaffPermissionController {
  async create(req, res, next) {
    try {
      const { error } = createPermission.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const permission = await service.create(req.body);

      res.status(201).json(permission);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const permissions = await service.getAll();

      res.json(permissions);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const permission = await service.getById(req.params.id);

      if (!permission) {
        return res.status(404).json({
          message: "Permission not found",
        });
      }

      res.json(permission);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error } = updatePermission.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const permission = await service.update(req.params.id, req.body);

      res.json(permission);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await service.delete(req.params.id);

      res.json({
        message: "Permission deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StaffPermissionController();