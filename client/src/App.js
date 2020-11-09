import React from "react";

import HomePage from "../src/pages/HomePage/HomePage";
import ProductPage from "../src/pages/ProductPage/ProductPage";
import CartPage from "../src/pages/CartPage/CartPage";
import ProductsPage from "../src/pages/ProductsPage/ProductsPage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/products/gender/:sex" component={ProductsPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
