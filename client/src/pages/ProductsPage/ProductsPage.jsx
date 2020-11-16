import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/productReducer/productActions";

import CarouselProduct from "../../components/carouselProduct/CarouselProduct";
import CustomButton from "../../components/customButton/CustomButton";

import Header from "../../components/header/Header";
import Men from "../../img/menBackground.jpg";
import Women from "../../img/womenBackground.jpg";

import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./products.scss";

const ProductsPage = ({ match }) => {
  const [jackets, setJackets] = useState([]);
  const [hoodies, setHoodies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(listProducts(match.params.sex));
  }, [match, dispatch]);
  
  useEffect(() => {
    if (products.length > 0) {
      const filteredJackets = products.filter(
        (item) => item.category === "jackets"
      );
      setJackets(filteredJackets);

      const filteredHoodies = products.filter(
        (item) => item.category === "hoody"
      );
      setHoodies(filteredHoodies);
    }
  }, [products]);
  return (
    <>
      <Header />
      <div
        className="backgroundImage"
        style={{
          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),  url(${
            match.params.sex === "male" ? Men : Women
          })`,
        }}
      >
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <div className="title">
              {match.params.sex === "male" ? (
                <h1>Men's Backcountry</h1>
              ) : (
                <h1>Women's Backcountry</h1>
              )}
              <span>Touring</span>
            </div>
            <div style={{ marginTop: "20px", outline: "none" }}>
              {showAll ? (
                <CustomButton onClick={() => setShowAll(!showAll)}>
                  Preview
                </CustomButton>
              ) : (
                <CustomButton onClick={() => setShowAll(!showAll)}>
                  See All
                </CustomButton>
              )}
            </div>
          </Col>
        </Row>
      </div>
      {showAll ? (
        <Container className="my-5">
          <Row>
            {products.map((item) => (
              <Col className="productRow">
                <CarouselProduct item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Container className="my-5">
          <h2>Jackets</h2>
          <Slider {...settings}>
            {jackets.map((item) => (
              <CarouselProduct key={item._id} item={item} />
            ))}
          </Slider>
          <h2>Hoodies</h2>
          <Slider {...settings}>
            {hoodies.map((item) => (
              <CarouselProduct key={item._id} item={item} />
            ))}
          </Slider>
        </Container>
      )}
    </>
  );
};

export default ProductsPage;
