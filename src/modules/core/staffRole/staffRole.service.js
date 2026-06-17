const repo = require("./staffRole.repository");

class StaffRoleService {
  async create(data) {
    return await repo.create(data);
  }

  async getAll() {
    return await repo.findAll();
  }

  async getById(id) {
    return await repo.findById(id);
  }

  async update(id, data) {
    return await repo.update(id, data);
  }

  async delete(id) {
    return await repo.delete(id);
  }
}

module.exports = new StaffRoleService();