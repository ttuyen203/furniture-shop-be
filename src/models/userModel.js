import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
