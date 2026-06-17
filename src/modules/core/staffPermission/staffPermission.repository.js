const {
  StaffPermission,
  StaffRole,
  StaffProfile,
} = require("../../../database/models");

class StaffPermissionRepository {
  async create(data) {
    return await StaffPermission.create(data);
  }

  async findAll() {
    return await StaffPermission.findAll({
      include: [
        {
          model: StaffRole,
        },
        {
          model: StaffProfile,
        },
      ],
    });
  }

  async findById(id) {
    return await StaffPermission.findByPk(id, {
      include: [
        {
          model: StaffRole,
        },
        {
          model: StaffProfile,
        },
      ],
    });
  }

  async update(id, data) {
    await StaffPermission.update(data, {
      where: { id },
    });

    return this.findById(id);
  }

  async delete(id) {
    return await StaffPermission.destroy({
      where: { id },
    });
  }
}

module.exports = new StaffPermissionRepository();