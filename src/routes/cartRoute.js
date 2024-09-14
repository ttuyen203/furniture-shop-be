import express from "express";
import CartController from "../controllers/cartController.js";

const router = express.Router();
const cartController = new CartController();

router.get("/carts", cartController.getAllCarts);
router.get("/carts/:id", cartController.getCartDetail);
router.get("/carts/user/:id", cartController.getCartUser);
router.post("/carts", cartController.createCart);
router.put("/carts/:id", cartController.updateCart);
router.delete("/carts/:id", cartController.deleteCart);
router.delete(
  "/carts/user/:userId/product/:id",
  cartController.deleteProductCart
);

export default router;
