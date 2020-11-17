import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByGender,
  deleteProduct
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById).delete(protect, isAdmin, deleteProduct);

router.route("/gender/:sex").get(getProductsByGender);

export default router;
