import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WithNavbar from "../../components/navbar/Navbar";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import Rating from "../../components/rating/Rating";

import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../../redux/productReducer/productActions";
import { productActionReviewTypes } from "../../redux/productReducer/productActionTypes";

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("L");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  // GLOBAL STATE
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success } = productCreateReview;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment(0);
      dispatch({ type: productActionReviewTypes.PRODUCT_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}?size=${size}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <WithNavbar />
      <Container className="pb-3">
        <Link
          className="btn btn-outline-secondary my-3  rounded"
          to={`/products/gender/${match.params.gender}`}
        >
          Go back
        </Link>
        <Row>
          <Col md={7}>
            <Image src={product.image} alt={product.name} fluid rounded />
          </Col>

          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>&euro;{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col md={8}>Qty:</Col>
                    <Col md={4}>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col  md={8}>Size:</Col>
                  <Col md={4}>
                    {product.sizes && (
                      <Form.Control
                        as="select"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {product.sizes.map((size, idx) => (
                          <option key={idx} value={size}>
                            {size}
                          </option>
                        ))}
                      </Form.Control>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block rounded"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="my-5">
          <Col
            md={7}
            style={{
              boxShadow: "0 1px 3px 3px #eee",
              borderRadius: "10px",
              padding: "10px 15px",
            }}
          >
            <h2 style={{ padding: "10px 0 0 25px" }}>Reviews</h2>
            {product.reviews.length === 0 && (
              <Alert variant="info" className="rounded pl-3 pr-3">
                No Reviews
              </Alert>
            )}
            <ListGroup variant="flush" className="p-4">
              {product.reviews.map(
                ({ _id, comment, rating, name, createdAt }) => (
                  <ListGroup.Item
                    key={_id}
                    style={{
                      boxShadow: "0 1px 3px 3px #eee",
                      borderRadius: "10px",
                      padding: "10px 15px 0 15px",
                      marginTop: "15px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{name}</strong>
                      <p>{createdAt.substring(0, 10)}</p>
                    </div>
                    <div className="float-right my-4">
                      <Rating value={rating} />
                    </div>
                    <p>{comment}</p>
                  </ListGroup.Item>
                )
              )}
              <ListGroup.Item style={{ padding: "15px 0" }}>
                <h4>Write a review</h4>
                {userInfo ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - poor</option>
                        <option value="2">2 - fair</option>
                        <option value="3">3 - good</option>
                        <option value="4">4 - very good</option>
                        <option value="5">5 - excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Control
                        as="textarea"
                        placeholder="type it here"
                        value={comment}
                        className="rounded"
                        row="3"
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="warning"
                      className="rounded btn-sm float-right"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Alert variant="info">Please, login to write a review</Alert>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
