const { User } = require("../../../database/models");

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findByPhone(phone) {
    return await User.findOne({ where: { phone } });
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findAll() {
    return await User.findAll();
  }

  async update(id, data) {
    return await User.update(data, { where: { id } });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();