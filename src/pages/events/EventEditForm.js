import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EventEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    event_image: "",
    event_date: "",
  });
  const { title, description, event_image, event_date } = postData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        const { title, description, event_image, event_date, is_owner } = data;
        if (is_owner) {
          const formattedDate = event_date ? new Date(event_date).toISOString().slice(0, 16) : '';
          setPostData({ 
            title: title || "", 
            description: description || "", 
            event_image: event_image || "", 
            event_date: formattedDate 
          });
        } else {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(event_image);
      setPostData({
        ...postData,
        event_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    if (imageInput?.current?.files[0]) {
      formData.append("event_image", imageInput.current.files[0]);
    }
    formData.append("event_date", event_date);

    try {
      await axiosReq.put(`/events/${id}/`, formData);
      history.push(`/events/${id}`);
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.event_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
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
        className={`${btnStyles.Button} ${btnStyles.Color}`}
        type="submit"
      >
        Save
      </Button>
    </div>
  );

  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col className="my-auto py-2 p-md-2" sm={12}>
        <h1 className={styles.Header}>edit your event</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="mx-3 py-2 p-0 p-md-2" md={6} lg={7}>
              <Container
                className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
              >
                <Form.Group className="text-center">
                      <figure>
                        <Image
                          className={appStyles.Image}
                          src={event_image}
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
                {errors?.event_image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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

export default EventEditForm;
