import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["COD", "BANK"],
      default: "COD",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipping", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", orderSchema);
