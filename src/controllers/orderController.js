import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      return res.status(200).json({
        message: "Lấy tất cả đơn hàng thành công",
        data: orders,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getOrderDetail(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }
      return res.status(200).json({
        message: "Lấy chi tiết đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async createOrder(req, res) {
    try {
      const newOrder = await Order.create(req.body);
      const cart = await Cart.findOneAndDelete({ user: req.body.user });

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      res.status(201).json({
        message: "Create Order Successful",
        data: newOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async updateOrder(req, res) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      res.status(200).json({
        message: "Update Order Successful",
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      res.status(200).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default OrderController;
