import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";

// Create New Order
// POST /api/orders
// Private route
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// GET ORDER BY ID
// GET /api/orders/:orderID
// Private route
const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// UPDATE ORDER to paid
// PUT /api/orders/:orderID/paypal
// Private route
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// UPDATE ORDER to paid
// PUT /api/orders/:orderID/stripe-payment
// Private route
const stripePayment = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "eur",
    metadata: {
      email: req.body.token.email,
      // address: req.body.address,
      // postalCode: req.body.postalCode,
      // city: req.body.city,
    },
  };

  await stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    }
  });
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
});

// GET logged in user orders
// GET /api/orders/myorders
// PRIVATE route

const getPaidOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// GET all orders
// GET /api/orders/
// PRIVATE route

const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// UPDATE ORDER to deliver out
// PUT /api/orders/:orderID/deliver
// Private route
const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  stripePayment,
  getPaidOrders,
  getAllOrders,
  updateOrderToDelivered,
};
