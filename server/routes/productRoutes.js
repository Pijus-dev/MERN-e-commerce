import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByGender,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

router.route("/gender/:sex").get(getProductsByGender);

export default router;
