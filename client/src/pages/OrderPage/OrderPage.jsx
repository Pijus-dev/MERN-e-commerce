import React, { useEffect, useState } from "react";
import axios from "axios";

import WithNavbar from "../../components/navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  stripePayOrder
} from "../../redux/orderReducer/orderActions";

import { orderActionPayTypes } from "../../redux/orderReducer/orderActionTypes";

import { Container, Row, Col, ListGroup, Image, Alert } from "react-bootstrap";
import Checkout from "../../components/checkout/Checkout";

import { Link } from "react-router-dom";

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const cartMethod = useSelector((state) => state.cart);
  const { paymentMethod } = cartMethod;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || successPay) {
      dispatch({
        type: orderActionPayTypes.ORDER_PAY_RESET,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, orderId, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const paymentType = (paymentResult) => {
    if (paymentMethod === "PayPal") {
      successPaymentHandler(paymentResult);
    } else if (paymentMethod === "stripe") {
      dispatch(stripePayOrder(orderId, order.totalPrice, paymentResult));
    }
  };

  return (
    <>
      <WithNavbar />
      {loading ? (
        <div>loading</div>
      ) : (
        <Container className="my-4">
          <h2>Order: {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping:</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Alert variant="success" className="rounded">
                      Delivered on {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert variant="info" className="rounded">
                      Not Delivered
                    </Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Alert variant="success" className="rounded">
                      Paid on {order.paidAt}
                    </Alert>
                  ) : (
                    <Alert variant="info" className="rounded">
                      Not Paid
                    </Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
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
                            {Math.round(item.qty * item.price, 2)}
                            <br />
                            size: {item.sizes}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Checkout
              cartItems={order.orderItems}
              itemsPrice={order.itemsPrice}
              shippingPrice={order.shippingPrice}
              taxPrice={order.taxPrice}
              total={order.totalPrice}
              onSuccess={paymentType}
              text="Pay Now"
              userInfo
            />
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderPage;
