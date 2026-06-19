const { ListingCategory } = require("../../../database/models");

class ListingCategoryRepository {
  async create(data) {
    return await ListingCategory.create(data);
  }

  async findAll() {
    return await ListingCategory.findAll();
  }

  async findById(id) {
    return await ListingCategory.findByPk(id);
  }

  async update(id, data) {
    const category = await ListingCategory.findByPk(id);
    if (!category) return null;

    return await category.update(data);
  }

  async delete(id) {
    const category = await ListingCategory.findByPk(id);
    if (!category) return null;

    await category.destroy();
    return true;
  }
}

module.exports = new ListingCategoryRepository();