import React, { useEffect, useState } from "react";

import Product from "../../components/product/Product";
import { Col, Row } from "react-bootstrap";

import axios from "axios";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    
    const { data } = await axios.get("/api/products");
    setItems(data);
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {items.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
