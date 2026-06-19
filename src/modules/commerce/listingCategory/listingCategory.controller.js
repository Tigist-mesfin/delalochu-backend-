const listingCategoryService = require("./listingCategory.service");

class ListingCategoryController {
  async create(req, res) {
    try {
      const result = await listingCategoryService.createCategory(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await listingCategoryService.getAllCategories();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await listingCategoryService.getCategoryById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await listingCategoryService.updateCategory(
        req.params.id,
        req.body
      );

      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await listingCategoryService.deleteCategory(req.params.id);

      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ListingCategoryController();