import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const url = window.location.pathname;
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link
              className={`${
                url === "/shipping" ? "border-bottom border-dark" : "none"
              } `}
            >
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link
              className={`${
                url === "/payment" ? "border-bottom border-dark" : "none"
              } `}
            >
              Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link
              className={`${
                url === "/placeorder" ? "border-bottom border-dark" : "none"
              } `}
            >
              Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
