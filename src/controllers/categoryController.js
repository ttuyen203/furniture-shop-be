import Category from "../models/categoryModel.js";
import slugify from "slugify";

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        message: "Get all categories",
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get all categories failed",
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
      const slug = slugify(req.body.name, { lower: true, strict: true });

      const existingCategory = await Category.findOne({ slug });
      if (existingCategory) {
        return res.status(400).json({
          message:
            "Category name already exists, please choose a different name",
        });
      }

      const category = await Category.create({ ...req.body, slug });
      return res.status(201).json({
        message: "Create category successful",
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

      const category = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { ...req.body, slug },
        { new: true }
      );

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      return res.status(200).json({
        message: "Category updated successfully",
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
      const category = await Category.findOneAndDelete({
        slug: req.params.slug,
      });
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      return res.status(200).json({
        message: "Category deleted successfully",
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
