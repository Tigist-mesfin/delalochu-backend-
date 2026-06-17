const service = require("./staffRole.service");
const { createRole, updateRole } = require("./staffRole.validation");

class StaffRoleController {
  async create(req, res, next) {
    try {
      const { error } = createRole.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const role = await service.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const roles = await service.getAll();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const role = await service.getById(req.params.id);
      res.json(role);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { error } = updateRole.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      await service.update(req.params.id, req.body);
      res.json({ message: "Updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await service.delete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StaffRoleController();