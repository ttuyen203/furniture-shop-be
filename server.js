import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import cartRoute from "./src/routes/cartRoute.js";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

app.use(categoryRoute);

app.use(productRoute);

app.use(userRoute);

app.use(cartRoute);

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
