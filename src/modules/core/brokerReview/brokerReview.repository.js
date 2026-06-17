const {
  BrokerReview,
  BrokerProfile,
  User,
} = require("../../../database/models");

class BrokerReviewRepository {
  async create(data) {
    return await BrokerReview.create(data);
  }

  async findAll() {
    return await BrokerReview.findAll({
      include: [
        {
          model: BrokerProfile,
        },
        {
          model: User,
        },
      ],
    });
  }

  async findById(id) {
    return await BrokerReview.findByPk(id, {
      include: [
        {
          model: BrokerProfile,
        },
        {
          model: User,
        },
      ],
    });
  }

  async update(id, data) {
    await BrokerReview.update(data, {
      where: { id },
    });

    return this.findById(id);
  }

  async delete(id) {
    return await BrokerReview.destroy({
      where: { id },
    });
  }
}

module.exports = new BrokerReviewRepository();