import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByGender,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

router.route("/gender/:sex").get(getProductsByGender);

export default router;
