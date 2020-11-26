import React, { useEffect, useState } from "react";

import { CLOTHES_TYPES } from "../../mockData";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../components/customButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CarouselProduct from "../../components/carouselProduct/CarouselProduct";
import Header from "../../components/header/Header";
import { listProducts } from "../../redux/productReducer/productActions";

import Suggestions from "../../components/suggestions/Suggesstions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./filteredProducts.module.scss";
import Slider from "react-slick";
import { ReactComponent as SearchIcon } from "../../img/icon.svg";
import { Link } from "react-router-dom";

const postsPerPage = 6;
let arrayForHoldingPosts = [];

const FilteredProducts = ({ match, history }) => {
  const keyword = match.params.keyword;
  const [itemsToShow, setItemsToShow] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [next, setNext] = useState(6);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const loopWithSlice = (start, end) => {
    const slicedPosts = products.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setItemsToShow(arrayForHoldingPosts);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 1300,
    slidesToShow: 4,
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
    loopWithSlice(7, postsPerPage);
  }, []);

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  let lastItem = products.length - 6;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const onTextChanged = (e) => {
    const { value } = e.target;
    let predictions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      predictions = products.sort().filter(({ name }) => regex.test(name));
      setSuggestions(predictions);
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    return <Suggestions suggestions={suggestions} />;
  };
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
                <CustomButton onClick={() => history.push("/products/male")}>
                  Shop Men's
                </CustomButton>
                <CustomButton onClick={() => history.push("/products/female")}>
                  Shop Women's
                </CustomButton>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Container className="my-5">
        <div className={styles.clothesTypes}>
          <Slider {...settings}>
            {CLOTHES_TYPES.map(({ link, title, id }) => (
              <Link to={link} key={id}>
                <div className={styles.type}>
                  <p>{title}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <Col>
          <div className={styles.filterInput}>
            <input type="text" onChange={onTextChanged} />
            <div className={styles.inputIcon}>
              <SearchIcon />
            </div>
          </div>
          {renderSuggestions()}
        </Col>
        <h2 className="my-5">Latest Products</h2>
        <Row>
          {products.slice(0, 6).map((item) => (
            <Col className="productRow" key={item._id}>
              <CarouselProduct key={item._id} item={item} />
            </Col>
          ))}
        </Row>
        <Row>
          {itemsToShow.map((item) => (
            <Col className="productRow" key={item._id}>
              <CarouselProduct item={item} />
            </Col>
          ))}
        </Row>
        {itemsToShow.length === lastItem ? (
          <div style={{ textAlign: "center" }}>
            <button
              className={styles.loadButton}
              variant="dark"
              onClick={() =>
                window.scroll({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              Back to top
            </button>
          </div>
        ) : products.length > 6 ? (
          <div style={{ textAlign: "center" }}>
            <button
              className={styles.loadButton}
              variant="dark"
              onClick={handleShowMorePosts}
            >
              Load more
            </button>
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default FilteredProducts;
