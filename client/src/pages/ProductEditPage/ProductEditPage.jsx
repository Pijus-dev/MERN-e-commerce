import React, { useEffect, useState } from "react";
import { connectAdvanced, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/productReducer/productActions";

import { productActionUpdateTypes } from "../../redux/productReducer/productActionTypes";

import { Link } from "react-router-dom";
import WithNavbar from "../../components/navbar/Navbar";

import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";

const ProductEditPage = ({ match, history }) => {
  const productID = match.params.id;

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    brand: "",
    sex: "",
    category: "",
    countInStock: 0,
  });
  const [sizes, setSizes] = useState([]);
  const [uploading, setUploading] = useState(false);

  const {
    name,
    price,
    description,
    image,
    brand,
    sex,
    category,
    countInStock,
  } = productInfo;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success, error: errorUpdate } = productUpdate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductInfo({ ...productInfo, [name]: value });
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: productActionUpdateTypes.PRODUCT_UPDATE_RESET,
      });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productID) {
        dispatch(listProductDetails(productID));
      } else {
        setProductInfo({
          name: product.name,
          price: product.price,
          description: product.description,
          sex: product.sex,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          image: product.image,
        });
        setSizes(product.sizes);
      }
    }
  }, [product, productID, dispatch, history, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...productInfo, _id: productID }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setProductInfo({
        ...productInfo,
        image: data,
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  console.log(productInfo);

  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <Link to="/admin/productlist" className="btn btn-dark btn-md rounded">
          GO BACK
        </Link>
        <Row className="justify-content-md-center">
          <Col xs={12} md={7}>
            <h2>Product Info</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="rounded"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter your name"
                  />
                </Col>
                <Col>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="price"
                    className="rounded"
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="rounded"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    type="textarea"
                    placeholder="description"
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    name="brand"
                    value={brand}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="brand"
                    className="rounded"
                  />
                </Col>
                <Col>
                  <Form.Label>Sex</Form.Label>
                  <Form.Control
                    name="sex"
                    value={sex}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="sex"
                    className="rounded"
                  />
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    value={image}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="image"
                    className="rounded"
                  />
                  <Form.File
                    id="image-file"
                    label="choose file"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                </Col>
                <Col>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="category"
                    className="rounded"
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    name="countInStock"
                    value={countInStock}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="countInStock"
                    className="rounded"
                  />
                </Col>
              </Form.Row>
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded my-3"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEditPage;
