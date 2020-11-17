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
  const stripe = new Stripe("sk_test_Uuy41OYoERxtEKNffc1IAwE200uEeLnURK");

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

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

  await stripe.charges.create(body, (stripeErr, stripeRes) => {
    console.log(stripeErr, stripeRes);
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

// GET logged in user orders
// GET /api/orders/myorders
// PRIVATE route

const getPaidOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});


export { addOrderItems, getOrderById, updateOrderToPaid, stripePayment, getPaidOrders };