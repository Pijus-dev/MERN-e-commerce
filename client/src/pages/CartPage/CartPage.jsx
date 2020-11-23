import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WithNavbar from "../../components/navbar/Navbar";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

import Visa from "../../img/cards/visa.svg";
import Master from "../../img/cards/master.svg";
import Paypal from "../../img/cards/paypal.svg";

import "./cartpage.scss";

import {
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartReducer/cartActions";

const CartPage = ({ match, location, history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const productId = match.params.id;

  const urlParams = location.search.split("=");
  const size = urlParams[2];

  const qty = urlParams[1] ? Number(urlParams[1].charAt(0)) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // calculate prices
  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const shippingPrice = itemsPrice > 100 ? 0 : 50;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const total = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/shipping");
  };
  const toggleModal = () => {
    setShowRegister(true);
    setShowModal(false);
  };
  return (
    <>
      <WithNavbar />
      <Container>
        <Row className="my-5">
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Alert variant="info" className="rounded">
                Your cart is empty <Link to="/shop">Go Back</Link>
              </Alert>
            ) : (
              <ListGroup variant="flush" className="p-0">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product} className="cartItems">
                    <Row>
                      <Link></Link>
                      <Col md={4}>
                        <LinkContainer
                          to={`/product/${item.sex}/${item.product}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </LinkContainer>
                      </Col>
                      <Col md={8}>
                        <Row>
                          <Col md={10}>
                            <Link to={`/product/${item.sex}/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={2}>&euro;{item.price}</Col>
                          <Col md={3} className="my-2">
                            <p className="my-2"> Quantity: {item.qty}</p>
                          </Col>
                          <Col md={1}>
                            <Button
                              type="button"
                              variant="light"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <p className="my-1 pl-1">Size: {item.sizes}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4} className="checkoutCard p-5" style={{ height: "50vh" }}>
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
            {userInfo ? (
              <Button
                type="submit"
                className="button"
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            ) : (
              <Button
                type="submit"
                className="button"
                onClick={() => setShowModal(true)}
              >
                Sign In
              </Button>
            )}
            <div className="paymentCard">
              <img src={Visa} alt="visa" />
              <img src={Master} alt="visa" />
              <img src={Paypal} alt="visa" />
            </div>
          </Col>
        </Row>
        {showRegister ? (
          <Register
            showRegister={showRegister}
            setShowRegister={setShowRegister}
          />
        ) : (
          <Login
            showModal={showModal}
            setShowModal={setShowModal}
            handleChange={toggleModal}
          />
        )}
      </Container>
    </>
  );
};

export default CartPage;
