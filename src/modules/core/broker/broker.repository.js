const {
  BrokerProfile,
  User,
  BrokerReview,
  CommissionHistory,
  SubscriptionHistory,
  ClientProfile,
} = require("../../../database/models");

class BrokerRepository {
  async create(data) {
    return await BrokerProfile.create(data);
  }

  async findAll() {
    return await BrokerProfile.findAll({
      include: [
        {
          model: User,
        },
        {
          model: BrokerReview,
        },
        {
          model: CommissionHistory,
        },
        {
          model: SubscriptionHistory,
        },
        {
          model: ClientProfile,
        },
      ],
    });
  }

  async findById(id) {
    return await BrokerProfile.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: BrokerReview,
        },
        {
          model: CommissionHistory,
        },
        {
          model: SubscriptionHistory,
        },
        {
          model: ClientProfile,
        },
      ],
    });
  }

  async update(id, data) {
    await BrokerProfile.update(data, {
      where: { id },
    });

    return this.findById(id);
  }

  async delete(id) {
    return await BrokerProfile.destroy({
      where: { id },
    });
  }
}

module.exports = new BrokerRepository();