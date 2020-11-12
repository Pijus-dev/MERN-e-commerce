import React from "react";

import { Col, Button } from "react-bootstrap";

import Visa from "../../img/cards/visa.svg";
import Master from "../../img/cards/master.svg";
import Paypal from "../../img/cards/paypal.svg";

const Checkout = ({
  cartItems,
  userInfo,
  setShowModal,
  checkoutHandler,
  text,
}) => {
  
  // calculate prices
  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const shippingPrice = itemsPrice > 100 ? 0 : 50;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  return (
    <Col md={4} className="checkoutCard p-5">
      <h2 className="text-white">Order Summary</h2>
      <div className="orderInfo my-3">
        <span className="text-white">
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
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
      {userInfo ? (
        <Button onClick={checkoutHandler} type="button">
          {text}
        </Button>
      ) : (
        <Button onClick={() => setShowModal(true)} type="button">
          Sign In
        </Button>
      )}
      <div className="paymentCard">
        <img src={Visa} alt="visa" />
        <img src={Master} alt="visa" />
        <img src={Paypal} alt="visa" />
      </div>
    </Col>
  );
};

export default Checkout;
