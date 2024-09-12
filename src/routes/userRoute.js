import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

const userController = new UserController();

router.get("/users", (req, res) => {
  userController.getAllUser(req, res);
});

router.get("/users/:id", (req, res) => {
  userController.getDetailUser(req, res);
});

router.put("/users/:id", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/users/:id", (req, res) => {
  userController.deleteUser(req, res);
});

router.post("/auth/register", (req, res) => {
  userController.register(req, res);
});

router.post("/auth/login", (req, res) => {
  userController.login(req, res);
});

export default router;
