import React from "react";

import { Col, Button } from "react-bootstrap";

import { PayPalButton } from "react-paypal-button-v2";

import Visa from "../../img/cards/visa.svg";
import Master from "../../img/cards/master.svg";
import Paypal from "../../img/cards/paypal.svg";

import { useSelector } from "react-redux";

const Checkout = ({
  cartItems,
  userInfo,
  setShowModal,
  checkoutHandler,
  text,
  itemsPrice,
  shippingPrice,
  taxPrice,
  total,
  amount,
  onSuccess
}) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { success } = orderDetails;

  const renderButtons = () => {
    if (userInfo && success) {
      return <PayPalButton amount={amount} onSuccess={onSuccess}/>;
    } else if (userInfo) {
      return (
        <Button onClick={checkoutHandler} type="button">
          {text}
        </Button>
      );
    } else {
      <Button onClick={() => setShowModal(true)} type="button">
        Sign In
      </Button>;
    }
  };

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
      <div className="orderInfo my-3">
        <span className="text-white">Total:</span>
        <span className="text-white">&euro; {total.toFixed(2)}</span>
      </div>
      {renderButtons()}
      <div className="paymentCard">
        <img src={Visa} alt="visa" />
        <img src={Master} alt="visa" />
        <img src={Paypal} alt="visa" />
      </div>
    </Col>
  );
};

export default Checkout;
