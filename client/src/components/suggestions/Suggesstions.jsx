import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";

import styles from "./suggestions.module.scss";

const Suggestions = ({ suggestions }) => {
  return (
    <Row>
      <Col>
        <ListGroup variant="flush" className="my-2">
          {suggestions.map((item) => (
            <Link to={`/product/${item.sex}/${item._id}`}>
              <ListGroup.Item key={item._id} className={styles.suggestions}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={10}>
                    <ul>
                      <li>{item.name}</li>
                      <li>&euro;{item.price}</li>
                      <li>{item.brand}</li>
                    </ul>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Suggestions;
