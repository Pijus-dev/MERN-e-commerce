import React, { useEffect, useState } from "react";
import axios from "axios";

import WithNavbar from "../../components/navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  stripePayOrder,
  deliverOrder,
} from "../../redux/orderReducer/orderActions";

import {
  orderActionPayTypes,
  orderActionDeliverTypes,
} from "../../redux/orderReducer/orderActionTypes";
import { cartActionTypes } from "../../redux/cartReducer/cartActionTypes";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Alert,
  Button,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import StripeButton from "../../components/stripeButton/StripeButton";

import { Link } from "react-router-dom";

import Visa from "../../img/cards/visa.svg";
import Master from "../../img/cards/master.svg";
import Paypal from "../../img/cards/paypal.svg";

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const cartMethod = useSelector((state) => state.cart);
  const { paymentMethod } = cartMethod;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

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
    if (!order || successPay || successDeliver) {
      dispatch({
        type: orderActionPayTypes.ORDER_PAY_RESET,
      });
      dispatch({
        type: orderActionDeliverTypes.ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, orderId, order, successDeliver, history]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (successPay) {
      dispatch({ type: cartActionTypes.RESET_PAYMENT_METHOD });
      const sendEmail = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.post(`/api/users/order/${orderId}`, {}, config);
      };
      sendEmail();
    }
  }, [successPay, dispatch, userInfo, orderId]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const stripePaymentHandler = (paymentResult) => {
    dispatch(stripePayOrder(orderId, order.totalPrice, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
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
                    <strong>Name: </strong> {order && order.user.name}
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
            <Col md={4} className="checkoutCard p-5" style={{ height: "50vh" }}>
              <h2 className="text-white">Order Summary</h2>
              <div className="orderInfo my-3">
                <span className="text-white">
                  Subtotal (
                  {order.orderItems.reduce((acc, item) => acc + item.qty, 0)})
                </span>
                <span className="text-white">
                  &euro;
                  {order.itemsPrice}
                </span>
              </div>
              <div className="orderInfo my-3">
                <span className="text-white">Shipping</span>
                <span className="text-white">&euro;{order.shippingPrice}</span>
              </div>
              <div className="orderInfo my-3">
                <span className="text-white">Tax Fee:</span>
                <span className="text-white">&euro;{order.taxPrice}</span>
              </div>
              <div className="orderInfo my-3">
                <span className="text-white">Total:</span>
                <span className="text-white">
                  &euro; {order.totalPrice.toFixed(2)}
                </span>
              </div>
              {paymentMethod === "PayPal" ? (
                <PayPalButton
                  amount={order.totalPrice.toFixed(2)}
                  onSuccess={successPaymentHandler}
                />
              ) : paymentMethod === "stripe" ? (
                <StripeButton
                  price={order.totalPrice.toFixed(2)}
                  onToken={stripePaymentHandler}
                />
              ) : userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered ? (
                <Button
                  type="submit"
                  variant="success"
                  onClick={deliverHandler}
                >
                  Mark As Deliver
                </Button>
              ) : null}
              <div className="paymentCard">
                <img src={Visa} alt="visa" />
                <img src={Master} alt="visa" />
                <img src={Paypal} alt="visa" />
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderPage;
