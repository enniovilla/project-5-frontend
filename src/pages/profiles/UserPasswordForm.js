import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    } finally {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row>
        <Col className="py-2 mx-auto text-center" md={6}>
          <Container className={appStyles.Content}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  placeholder="New Password"
                  type="password"
                  value={new_password1}
                  onChange={handleChange}
                  name="new_password1"
                />
              </Form.Group>
              {errors?.new_password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Form.Group>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  placeholder="Confirm New Password"
                  type="password"
                  value={new_password2}
                  onChange={handleChange}
                  name="new_password2"
                />
              </Form.Group>
              {errors?.new_password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Color}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${btnStyles.Button} ${btnStyles.Color}`}
              >
                Save
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change your password? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPasswordForm;
