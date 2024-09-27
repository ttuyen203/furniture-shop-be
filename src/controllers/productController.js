import Product from "../models/productModel.js";
import slugify from "slugify";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({}).populate("category");
      return res.status(200).json({
        message: "Get all products",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get all products failed",
        error: error.message,
      });
    }
  }

  async getProductDetail(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug }).populate(
        "category"
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({
        message: "Get product detail",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get product detail failed",
        error: error.message,
      });
    }
  }

  async createProduct(req, res) {
    try {
      const slug = slugify(req.body.name, { lower: true, strict: true });

      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return res.status(400).json({
          message:
            "Product name already exists, please choose a different name",
        });
      }

      const images = req.body.images || "";

      const product = await Product.create({ ...req.body, slug, images });
      return res.status(201).json({
        message: "Create product successful",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Create product failed",
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const slug = slugify(req.body.name, { lower: true, strict: true });

      const product = await Product.findOneAndUpdate(
        { slug: req.params.slug },
        { ...req.body, slug },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.status(200).json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Update product failed",
        error: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findOneAndDelete({ slug: req.params.slug });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Delete product failed",
        error: error.message,
      });
    }
  }
}

export default ProductController;
