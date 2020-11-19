import React, { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../components/customButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CarouselProduct from "../../components/carouselProduct/CarouselProduct";
import Header from "../../components/header/Header";
import { listProducts } from "../../redux/productReducer/productActions";

import styles from "./filteredProducts.module.scss";

const FilteredProducts = ({ match, history }) => {
  const keyword = match.params.keyword;
  
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Header />
      <div className={styles.backgroundImage}>
        <Row className="d-flex justify-content-center">
          <Col
            xs={12}
            md={8}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div className={styles.title}>
              <h1>New Winter Arrivals</h1>
              <p>
                We trust you only buy new if you really need to. If that’s the
                case, our new Snow gear just arrived
              </p>
              <div className={styles.buttons}>
                <CustomButton
                  onClick={() => history.push("/products/gender/male")}
                >
                  Shop Men's
                </CustomButton>
                <CustomButton
                  onClick={() => history.push("/products/gender/female")}
                >
                  Shop Women's
                </CustomButton>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Container className="my-5">
        <h2>Latest Products</h2>
        <Row>
          {products.map((item) => (
            <Col>
              <CarouselProduct key={item._id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FilteredProducts;
