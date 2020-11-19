import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// fetch all products from mongoDB
// GET to '/api/products
// @ access Public route
export const getProducts = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({...keyword});

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

// delete product
// GET to '/api/products/:id
// @ access Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

// create product
// POST to '/api/products
// @ access Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample",
    price: 0,
    user: req.user._id,
    image: "/images/backpack.jpg",
    brand: "sample brand",
    category: "sample category",
    sex: "male",
    description: "sample description",
    sizes: ["L", "XL", "M", "XLL", "S"],
    countInStock: 0,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// update product
// PUT to '/api/products/:id
// @ access Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    sex,
    category,
    countInStock,
    numReviews,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.sex = sex;
    product.category = category;
    product.countInStock = countInStock;
    product.brand = brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

// create product review
// POST to '/api/products/:id/reviews
// @ access Private
export const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
