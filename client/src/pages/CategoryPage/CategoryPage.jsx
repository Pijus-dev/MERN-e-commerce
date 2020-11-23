import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductsBySexAndCategory } from "../../redux/productReducer/productActions";

import CarouselProduct from "../../components/carouselProduct/CarouselProduct";
import Sweaters from "../../img/sweaters.jpg";
import Hoodies from "../../img/hoodies.jpg";
import Pants from "../../img/pants.jpg";
import Backpacks from "../../img/backpack.jpeg";
import Jackets from "../../img/jacketBackground.jpg";
import WomenSweaters from "../../img/sweaterBackground.jpg";
import Header from "../../components/header/Header";

import { Row, Col, Container } from "react-bootstrap";

import styles from "./category.module.scss";
import { useEffect } from "react";

const CategoryPage = ({ match }) => {
  const category = match.params.category;
  const sex = match.params.sex;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProductsBySexAndCategory(sex, category));
  }, [dispatch, category, sex]);
  return (
    <>
      <Header />
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),  url(${
            category === "hoodies" && sex === "female"
              ? WomenSweaters
              : category === "pants"
              ? Pants
              : category === "hoodies"
              ? Hoodies
              : category === "jackets"
              ? Jackets
              : category === "sweaters"
              ? Sweaters
              : Backpacks
          })`,
        }}
      >
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <div className={styles.title}>
              {sex === "male" ? (
                <h1>Men's {category}</h1>
              ) : (
                <h1> Women's {category}</h1>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Container className="my-5">
        <h2>Latest Products</h2>
        <Row className="my-5">
          {products.map((item) => (
            <Col>
              <CarouselProduct item={item} key={item._id} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CategoryPage;
