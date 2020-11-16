import express from "express";
import { addOrderItems, getOrderById , updateOrderToPaid, stripePayment} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/stripe-payment").put(protect,stripePayment);

export default router;
