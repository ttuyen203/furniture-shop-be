import express from "express";
import OrderController from "../controllers/orderController.js";

const router = express.Router();
const orderController = new OrderController();

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderDetail);
router.get("/orders/user/:id", orderController.getOrderUser);
router.post("/orders", orderController.createOrder);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

router.put("/orders/:id/confirm", orderController.confirmOrder);
router.put("/orders/:id/ship", orderController.shipOrder);
router.put("/orders/:id/deliver", orderController.deliverOrder);
router.put("/orders/:id/cancel", orderController.cancelOrder);

export default router;
