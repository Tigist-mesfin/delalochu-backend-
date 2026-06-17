const {
  ClientProfile,
  User,
  BrokerProfile,
} = require("../../../database/models");

class ClientRepository {
  async create(data) {
    return await ClientProfile.create(data);
  }

  async findAll() {
    return await ClientProfile.findAll({
      include: [
        {
          model: User,
        },
        {
          model: User,
          as: "registeredByStaff",
        },
        {
          model: BrokerProfile,
        },
      ],
    });
  }

  async findById(id) {
    return await ClientProfile.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: User,
          as: "registeredByStaff",
        },
        {
          model: BrokerProfile,
        },
      ],
    });
  }

  async update(id, data) {
    await ClientProfile.update(data, {
      where: { id },
    });

    return this.findById(id);
  }

  async delete(id) {
    return await ClientProfile.destroy({
      where: { id },
    });
  }
}

module.exports = new ClientRepository();