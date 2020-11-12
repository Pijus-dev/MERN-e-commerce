import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/userReducer/userActions";

import { userActionUpdateTypes } from "../../redux/userReducer/userActionTypes";

import WithNavbar from "../../components/navbar/Navbar";

const ProfilePage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputBorder, setInputBorder] = useState(false);

  const { name, email, password, confirmPassword } = userInput;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput({ ...userInput, [name]: value.trim() });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
      setMessage("You have successfully updated your profile");
    }
  };
  useEffect(() => {
    if (!user || !user.name) {
      dispatch({ type: userActionUpdateTypes.USER_UPDATE_RESET });
      dispatch(getUserDetails("profile"));
    } else {
      setUserInput({
        name: user.name,
        email: user.email,
      });
    }
  }, [dispatch, user, userInfo]);
  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <Row>
          <Col md={4}>
            <h2>Profile</h2>
            <Form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded"
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col md={8}>
            <h2>My Orders</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
