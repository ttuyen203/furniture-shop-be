import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await User.find({});
      return res.status(200).json({
        message: "Get all users",
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get all users failed",
        error: error.message,
      });
    }
  }

  async getDetailUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: "Get user detail",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get user detail failed",
        error: error.message,
      });
    }
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Register successfully",
        data: newUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Register failed",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign({ id: user._id }, "hiii", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login successfully",
        token,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Login failed",
        error: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: "Update user successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: "Delete user successfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
