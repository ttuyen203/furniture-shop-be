import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      return res.status(200).json({
        message: "Get all order",
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
        message: "Get detail order",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getOrderUser(req, res) {
    try {
      const order = await Order.find({ user: req.params.id });

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      res.status(200).json(order);
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

  async confirmOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      if (order.status !== "Pending") {
        return res.status(400).json({ message: "Order cannot be confirmed" });
      }

      order.status = "Confirmed";
      await order.save();

      res.status(200).json({
        message: "Order confirmed successfully",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async shipOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status !== "Confirmed") {
        return res.status(400).json({ message: "Order cannot be shipped" });
      }

      order.status = "Shipping";
      await order.save();

      res.status(200).json({
        message: "Order is being shipped",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async deliverOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status !== "Shipping") {
        return res
          .status(400)
          .json({ message: "Order cannot be marked as delivered" });
      }

      order.status = "Delivered";
      await order.save();

      res.status(200).json({
        message: "Order delivered successfully",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async cancelOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status === "Shipping" || order.status === "Delivered") {
        return res.status(400).json({ message: "Order cannot be cancelled" });
      }

      order.status = "Cancelled";
      await order.save();

      res.status(200).json({
        message: "Order cancelled successfully",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default OrderController;
