import React, { useEffect } from "react";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Alert,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import WithNavbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/orderReducer/orderActions";


import Visa from "../../img/cards/visa.svg";
import Master from "../../img/cards/master.svg";
import Paypal from "../../img/cards/paypal.svg";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // calculate prices
  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const shippingPrice = itemsPrice > 100 ? 0 : 50;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      })
    );
  };

  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping:</h2>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address},{shippingAddress.city},
                  {shippingAddress.postalCode},{shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Alert className="rounded" variant="danger">
                    Your Cart Is Empty
                  </Alert>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              fluid
                              alt={item.name}
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.sex}/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x &euro;{item.price} = &euro;
                            {item.qty * item.price}
                            <br />
                            size: {item.sizes}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Alert variant="danger">{error}</Alert>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4} className="checkoutCard p-5" style={{ height: "50vh" }}>
            <h2 className="text-white">Order Summary</h2>
            <div className="orderInfo my-3">
              <span className="text-white">
                Subtotal (
                {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </span>
              <span className="text-white">
                &euro;
                {itemsPrice}
              </span>
            </div>
            <div className="orderInfo my-3">
              <span className="text-white">Shipping</span>
              <span className="text-white">&euro;{shippingPrice}</span>
            </div>
            <div className="orderInfo my-3">
              <span className="text-white">Tax Fee:</span>
              <span className="text-white">&euro;{taxPrice}</span>
            </div>
            <div className="orderInfo my-3">
              <span className="text-white">Total:</span>
              <span className="text-white">&euro; {totalPrice.toFixed(2)}</span>
            </div>
            <Button
              type="submit"
              className="button"
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
            <div className="paymentCard">
              <img src={Visa} alt="visa" />
              <img src={Master} alt="visa" />
              <img src={Paypal} alt="visa" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrder;
