import express from "express";
import OrderController from "../controllers/orderController.js";

const router = express.Router();
const orderController = new OrderController();

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderDetail);
router.post("/orders", orderController.createOrder);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

export default router;
