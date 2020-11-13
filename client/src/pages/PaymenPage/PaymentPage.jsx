import React, { useState } from "react";

import WithNavbar from "../../components/navbar/Navbar";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../../redux/cartReducer/cartActions";


const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <CheckoutSteps step1 step2 step3 />
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2>Payment Method</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Col>
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    id="credit"
                    name="paymentMethod"
                    value="stripe"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded"
              >
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentPage;
