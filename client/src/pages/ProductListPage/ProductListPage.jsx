import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import WithNavbar from "../../components/navbar/Navbar";
import { Button, Modal, Row, Col, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  listProducts,
  deleteProduct,
} from "../../redux/productReducer/productActions";

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successMessage } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleDelete = (id) => {
    setShow(false);
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, successMessage]);

  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3 rounded">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {products && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>SEX</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ name, price, category, brand, _id, sex }) => (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>&euro;{price}</td>
                  <td>{category}</td>
                  <td>{brand}</td>
                  <td>{sex}</td>
                  <td>
                    <LinkContainer to={`admin/product/${_id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => setShow(true)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    <Modal show={show} onHide={() => setShow(false)}>
                      <Modal.Header>Are you sure?</Modal.Header>
                      <Modal.Footer>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};
export default ProductListPage;
