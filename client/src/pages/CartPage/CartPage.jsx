import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WithNavbar from "../../components/navbar/Navbar";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import Checkout from "../../components/checkout/Checkout";

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
              <Alert variant="info">
                Your cart is empty <Link to="/">Go Back</Link>
              </Alert>
            ) : (
              <ListGroup variant="flush" className="p-0">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Link></Link>
                      <Col md={4}>
                        <LinkContainer to={`/product/${item.product}`}>
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={2}>&euro;{item.price}</Col>
                          <Col md={3} className="my-2">
                            <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
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
                            <p className="my-2 pl-1">Size: {item.sizes}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Checkout
            cartItems={cartItems}
            userInfo={userInfo}
            setShowModal={setShowModal}
            checkoutHandler={checkoutHandler}
            text="Checkout"
          />
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
