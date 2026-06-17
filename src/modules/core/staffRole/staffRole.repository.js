const { StaffRole } = require("../../../database/models");

class StaffRoleRepository {
  async create(data) {
    return await StaffRole.create(data);
  }

  async findAll() {
    return await StaffRole.findAll();
  }

  async findById(id) {
    return await StaffRole.findByPk(id);
  }

  async update(id, data) {
    return await StaffRole.update(data, { where: { id } });
  }

  async delete(id) {
    return await StaffRole.destroy({ where: { id } });
  }
}

module.exports = new StaffRoleRepository();