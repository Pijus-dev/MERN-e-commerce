import React from "react";
import { Container } from "react-bootstrap";

import Header from "../src/components/header/Header";
import HomePage from "../src/pages/HomePage/HomePage";
import ProductPage from "../src/pages/ProductPage/ProductPage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/product/:id" component={ProductPage} />
          </Switch>
        </Container>
      </main>
    </>
  );
}

export default App;
