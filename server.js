import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute from "./src/routes/categoryRoute.js";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

app.use(categoryRoute);

dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
