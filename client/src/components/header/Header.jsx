import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Login from "../login/Login";
import Register from "../register/Register";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer/userActions";

import SearchBox from "../searchBox/SearchBox";

import { ReactComponent as Logo1 } from "../../img/logo2.svg";
import { withRouter } from "react-router-dom";
import  "./header.scss";

const Header = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const toggleModal = () => {
    setShowRegister(true);
    setShowModal(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Logo1 />
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to>
                <SearchBox />
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link style={{ color: "white" }}>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <LinkContainer to="/profile">
                  <Nav.Link style={{ color: "white" }}>
                    Hi,{userInfo.name}
                  </Nav.Link>
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
                <NavDropdown className="rounded" title="Admin" id="adminMenu">
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
        </Container>
      </Navbar>
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
    </header>
  );
};

export default withRouter(Header);
