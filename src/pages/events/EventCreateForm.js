import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EventCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    event_date: "",
  });
  const { title, description, image, event_date } = postData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);
    formData.append("event_date", event_date);

    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          className={styles.Input}
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Event Date and Time</Form.Label>
        <Form.Control
          className={styles.Input}
          type="datetime-local"
          name="event_date"
          value={event_date}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Color}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Color}`}
        type="submit"
      >
        Create
      </Button>
    </div>
  );

  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col className="my-auto py-2 p-md-2" sm={12}>
        <h1 className={styles.Header}>create an event</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="mx-3 py-2 p-0 p-md-2" md={6} lg={7}>
              <Container
                className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
              >
                <Form.Group className="text-center">
                  {image ? (
                    <>
                      <figure>
                        <Image
                          className={appStyles.Image}
                          src={image}
                          rounded
                        />
                      </figure>
                      <div>
                        <Form.Label
                          className={`${btnStyles.Button} ${btnStyles.Color}`}
                          htmlFor="image-upload"
                        >
                          Change the image
                        </Form.Label>
                      </div>
                    </>
                  ) : (
                    <Form.Label
                      className="d-flex justify-content-center"
                      htmlFor="image-upload"
                    >
                      <Asset
                        src={Upload}
                        message="Click or tap to upload an image"
                      />
                    </Form.Label>
                  )}

                  <Form.Group controlId="image-upload" className="d-none">
                    <Form.Control
                      className={styles.Input}
                      type="file"
                      accept="image/*"
                      onChange={handleChangeImage}
                      ref={imageInput}
                    />
                  </Form.Group>
                </Form.Group>

                <div className="d-md-none">{textFields}</div>
              </Container>
            </Col>
            <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default EventCreateForm;
