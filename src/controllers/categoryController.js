import Category from "../models/categoryModel.js";
import slugify from "slugify";

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        message: "Get all category",
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get all category failed",
        error: error.message,
      });
    }
  }

  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json({
        message: "Get category detail",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get category detail failed",
        error: error.message,
      });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      return res.status(200).json({
        message: "Create category done",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Create category failed",
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const slug = slugify(req.body.name, { lower: true, strict: true });
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { ...req.body, slug },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      return res.status(200).json({
        message: "Category updated done",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Update category failed",
        error: error.message,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      return res.status(200).json({
        message: "Category deleted done",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Delete category failed",
        error: error.message,
      });
    }
  }
}

export default CategoryController;
