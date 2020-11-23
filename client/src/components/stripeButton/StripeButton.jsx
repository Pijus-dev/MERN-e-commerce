import React from "react";
import StripeCheckout from "react-stripe-checkout";
import styles from "./button.module.scss";
import { useSelector } from "react-redux";

const StripeButton = ({ price, onToken }) => {
  const priceForStripe = price * 100;
  const api_key = "pk_test_i28ouERO9Dli1OlxDdGM7HFA00hCEjnkrw";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <StripeCheckout
      email={userInfo.email}
      amount={priceForStripe}
      description={`Your total price is €${price}`}
      shippingAddress={false}
      billingAddress={false}
      name="MB ADVENTURE"
      image="https://static.scientificamerican.com/sciam/cache/file/4E0744CD-793A-4EF8-B550B54F7F2C4406_source.jpg"
      stripeKey={api_key}
      token={onToken}
    >
      <button className={styles.btn}>PAY NOW</button>
    </StripeCheckout>
  );
};

export default StripeButton;
