import React, { useState } from "react";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { ReactComponent as Logo1 } from "../../img/logo2.svg";
import SearchBox from "../searchBox/SearchBox";
import Login from "../login/Login";
import Register from "../register/Register";

import { logout } from "../../redux/userReducer/userActions";

import "./navbar.scss";

const WithNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const toggleModal = () => {
    setShowRegister(true);
    setShowModal(false);
  };
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Logo1 />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to>
                <SearchBox />
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <LinkContainer to="/profile">
                  <Nav.Link>Hi,{userInfo.name}</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to>
                  <Nav.Link
                    style={{ color: "white" }}
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <LinkContainer to>
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
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
      </Navbar>
    </>
  );
};
export default WithNavbar;
