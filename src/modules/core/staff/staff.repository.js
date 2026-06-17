const { StaffProfile, User, StaffRole } = require("../../../database/models");

class StaffRepository {
  async create(data) {
    return await StaffProfile.create(data);
  }

  async findAll() {
    return await StaffProfile.findAll({
      include: [User, StaffRole],
    });
  }

  async findById(id) {
    return await StaffProfile.findByPk(id, {
      include: [User, StaffRole],
    });
  }

  async update(id, data) {
    return await StaffProfile.update(data, { where: { id } });
  }

  async delete(id) {
    return await StaffProfile.destroy({ where: { id } });
  }
}

module.exports = new StaffRepository();