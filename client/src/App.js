import React from "react";

import HomePage from "../src/pages/HomePage/HomePage";
import ProductPage from "../src/pages/ProductPage/ProductPage";
import CartPage from "../src/pages/CartPage/CartPage";
import ProductsPage from "../src/pages/ProductsPage/ProductsPage";
import ProfilePage from "../src/pages/ProfilePage/ProfilePage";
import ShippingPage from "../src/pages/ShippingPage/ShippingPage";
import PaymentPage from "../src/pages/PaymenPage/PaymentPage";
import PlaceOrder from "../src/pages/PlaceOrder/PlaceOrder";
import OrderPage from "../src/pages/OrderPage/OrderPage";
import UserListPage from "../src/pages/UserListPage/UserListPage";
import ProductListPage from "../src/pages/ProductListPage/ProductListPage";
import ProductEditPage from "../src/pages/ProductEditPage/ProductEditPage";
import OrderListPage  from "../src/pages/OrderListPage/OrderListPage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:gender/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/products/gender/:sex" component={ProductsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/productlist" component={ProductListPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/admin/product/:id/edit" component={ProductEditPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
