import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

// fetch all products from mongoDB
// GET to '/api/products
// @ access Public route
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// fetch single product from mongoDB
// GET to '/api/products/:id
// @ access Public route
router.get("/:id", expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
      res.json(product);

  } else {
      res.status(404);
      throw new Error("Product not found");
  }
}));

export default router;
