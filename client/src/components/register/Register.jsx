import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/userReducer/userActions";

const Register = ({ showRegister, setShowRegister }) => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputBorder, setInputBorder] = useState(false);
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword } = userInput;
  const userRegister = useSelector((state) => state.userRegister);
  const { error } = userRegister;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput({ ...userInput, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      dispatch(register(name, email, password));
      setMessage("You have successfully registered");

      setTimeout(() => {
        setShowRegister(false);
      }, 2500);
    } else {
      setInputBorder(true);
    }
  };

  const closeModal = () => {
    setShowRegister(false);
    setInputBorder(false);
  };

  return (
    <Row>
      <Col>
        <Modal
          className="my-5"
          show={showRegister}
          onHide={closeModal}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <h2>Register</h2>
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {error && (
                <Alert className="rounded" variant="danger">
                  {error}
                </Alert>
              )}
              {errorMessage && (
                <Alert className="rounded" variant="danger">
                  {errorMessage}
                </Alert>
              )}
              {message && (
                <Alert className="rounded" variant="success">
                  {message}
                </Alert>
              )}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className={`${
                    inputBorder ? "border border-danger" : "none"
                  } rounded`}
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter email"
                  className={`${
                    inputBorder ? "border border-danger" : "none"
                  } rounded`}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className={`${
                    inputBorder ? "border border-danger" : "none"
                  } rounded`}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className={`${
                    inputBorder ? "border border-danger" : "none"
                  } rounded`}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded"
              >
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

export default Register;
