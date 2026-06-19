const listingCategoryRepo = require("./listingCategory.repository");

class ListingCategoryService {
  async createCategory(data) {
    return await listingCategoryRepo.create(data);
  }

  async getAllCategories() {
    return await listingCategoryRepo.findAll();
  }

  async getCategoryById(id) {
    return await listingCategoryRepo.findById(id);
  }

  async updateCategory(id, data) {
    return await listingCategoryRepo.update(id, data);
  }

  async deleteCategory(id) {
    return await listingCategoryRepo.delete(id);
  }
}

module.exports = new ListingCategoryService();