import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// fetch all products from mongoDB
// GET to '/api/products
// @ access Public route
export const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// fetch single product from mongoDB
// GET to '/api/products/:id
// @ access Public route
export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// fetch all products based on gender from mongoDB
// GET to '/api/products
// @ access Public route
export const getProductsByGender = expressAsyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    { $match: { sex: `${req.params.sex}` } },
  ]);
  res.json(products);
});
