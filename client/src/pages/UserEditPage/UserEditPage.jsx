import React, { useState, useEffect } from "react";
import WithNavbar from "../../components/navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, editUser } from "../../redux/userReducer/userActions";
import { userActionEditTypes } from "../../redux/userReducer/userActionTypes";
import { Link } from "react-router-dom";

import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";

const UserEditPage = ({ match, history }) => {
  const userID = match.params.id;
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [admin, setAdmin] = useState(false);
  const { name, email, isAdmin } = userInfo;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const { success, error: errorUpdate } = userEdit;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch({ type: userActionEditTypes.USER_EDIT_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userID) {
        dispatch(getUserDetails(userID));
      } else {
        setUserInfo({
          name: user.name,
          email: user.email,
        });
        setAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userID, user, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ ...userInfo, _id: userID, isAdmin: admin }));
  };

  return (
    <>
      <WithNavbar />
      <Container className="my-4">
        <Link to="/admin/userlist" className="btn btn-dark btn-sm rounded">
          GO BACK
        </Link>
        <Row className="justify-content-md-center">
          <Col xs={12} md={7}>
            <h2>Edit User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Users' Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={handleInputChange}
                  className="rounded"
                  name="name"
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Users' Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleInputChange}
                  className="rounded"
                  name="email"
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  label="isAdmin"
                  name="isAdmin"
                  onChange={(e) => setAdmin(e.target.checked)}
                  checked={admin}
                  type="checkbox"
                />
              </Form.Group>
              <Button type="submit" className="float-right rounded btn-sm">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditPage;
