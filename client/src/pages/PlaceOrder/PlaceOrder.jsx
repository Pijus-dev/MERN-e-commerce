import React from "react";

import { Container, Row, Col, ListGroup, Image, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";

import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import Checkout from "../../components/checkout/Checkout";
import WithNavbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

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
            </ListGroup>
          </Col>
          <Checkout cartItems={cart.cartItems} text="Pay Now" userInfo />
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrder;
