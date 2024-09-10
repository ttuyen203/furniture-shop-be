import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

const productController = new ProductController();

router.get("/products", productController.getAllProducts);
router.get("/products/:slug", productController.getProductDetail);
router.post("/products", productController.createProduct);
router.put("/products/:slug", productController.updateProduct);
router.delete("/products/:slug", productController.deleteProduct);

export default router;
