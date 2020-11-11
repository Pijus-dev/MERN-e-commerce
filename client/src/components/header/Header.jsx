import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Login from "../login/Login";
import Register from "../register/Register";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer/userActions";
import { ReactComponent as SearchIcon } from "../../img/icon.svg";
import { ReactComponent as Logo1 } from "../../img/logo2.svg";
import { withRouter } from "react-router-dom";
import styles from "./header.module.scss";

const Header = ({ history }) => {
  const [showInput, setShowInput] = useState(false);
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
                {showInput ? (
                  <div className={styles.searchIcon}>
                    <input type="text" />
                    <div
                      className={styles.inputIcon}
                      onClick={() => setShowInput(false)}
                    >
                      <SearchIcon />
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.searchIcon}
                    onClick={() => setShowInput(true)}
                  >
                    <SearchIcon />
                  </div>
                )}
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
    </header>
  );
};

export default withRouter(Header);
