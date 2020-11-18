import React, { useState } from "react";
import WithNavbar from "../../components/navbar/Navbar";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../../redux/cartReducer/cartActions";

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [shippingInfo, setShippingInfo] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const { address, city, postalCode, country } = shippingInfo;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingInfo));
    history.push("/payment");
  };

  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <CheckoutSteps step1 step2 />
       
            <Row className="justify-content-md-center">
              <Col xs={12} md={8}>
                <h2>Shipping</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      className="rounded"
                      name="address"
                      value={address}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter your address"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      value={city}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter city"
                      className="rounded"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      required
                      name="postalCode"
                      value={postalCode}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter your postal code"
                      className="rounded"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      name="country"
                      value={country}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter your country"
                      className="rounded"
                    />
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

export default ShippingPage;
