import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";

const Register = ({ showRegister, setShowRegister }) => {
  return (
    <Row>
      <Col>
        <Modal
          className="my-5"
          show={showRegister}
          onHide={() => setShowRegister(false)}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <h2>Register</h2>
            </Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              {/* {error && (
                <Alert className="rounded" variant="danger">
                  {error}
                </Alert>
              )}
              {message && (
                <Alert className="rounded" variant="success">
                  {message}
                </Alert>
              )} */}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  rounded
                  type="text"
                  placeholder="Enter your name"
                  className="rounded"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  rounded
                  type="email"
                  placeholder="Enter email"
                  className="rounded"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="rounded"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                variant="dark"
                className="btn btn-block rounded"
              >
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

export default Register;
