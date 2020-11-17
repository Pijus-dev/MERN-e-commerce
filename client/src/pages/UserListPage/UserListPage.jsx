import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import WithNavbar from "../../components/navbar/Navbar";
import { Button, Modal, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listUsers, deleteUser } from "../../redux/userReducer/userActions";

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [show, setShow] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setShow(false);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successDelete]);
  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <h1>Users</h1>
        {users && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ name, email, isAdmin, _id }) => (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>
                    <a href={`mailto:${email}`}> {email}</a>
                  </td>
                  <td>
                    {isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${_id}/edit`}>
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

export default UserListPage;
