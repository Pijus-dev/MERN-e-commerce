import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../../img/logo.png";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
              <div className={styles.logo}>
                <img
                  style={{ height: "90px", width: "90px" }}
                  src={Logo}
                  alt=""
                />
              </div>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/shop">
                <Nav.Link style={{ color: "white" }}>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link style={{ color: "white" }}>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link style={{ color: "white" }}>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
