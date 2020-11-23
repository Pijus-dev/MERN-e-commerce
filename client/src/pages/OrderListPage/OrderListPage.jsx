import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllOrders } from "../../redux/orderReducer/orderActions";

import { LinkContainer } from "react-router-bootstrap";
import WithNavbar from "../../components/navbar/Navbar";
import { Button, Row, Col, Table, Container } from "react-bootstrap";

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <h2>Orders</h2>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>&euro;{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="dark rounded" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default OrderListPage;
