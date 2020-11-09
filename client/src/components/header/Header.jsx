import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { ReactComponent as SearchIcon } from "../../img/icon.svg";
import { ReactComponent as Logo1 } from "../../img/logo2.svg";
import styles from "./header.module.scss";

const Header = () => {
  const [showInput, setShowInput] = useState(false);
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
                    <div className={styles.inputIcon} onClick={() => setShowInput(false)}>
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
