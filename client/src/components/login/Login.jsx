import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userReducer/userActions";

import "./login.scss";

const Login = ({ showModal, setShowModal, handleChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
    setMessage("You have successfully signed in");

    setTimeout(() => {
      setShowModal(false);
    }, 2500);
  };
  return (
    <Row>
      <Col>
        <Modal
          className="my-5"
          show={showModal}
          onHide={() => setShowModal(false)}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <h2>Sign In</h2>
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {error && (
                <Alert className="rounded" variant="danger">
                  {error}
                </Alert>
              )}
              {message && (
                <Alert className="rounded" variant="success">
                  {message}
                </Alert>
              )}
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rounded
                  type="email"
                  placeholder="Enter email"
                  className="rounded"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="rounded"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col>
                  <p onClick={handleChange}>
                    New customer? <strong>Register</strong>
                  </p>
                </Col>
              </Row>
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded"
              >
                Sign In
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

export default Login;
