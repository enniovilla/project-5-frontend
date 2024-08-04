import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import { Alert } from "react-bootstrap";
import appStyles from "../../App.module.css";

function EventPage() {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
        console.log(event);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {success === "true" && (
          <Alert variant="success" className="text-center mb-4">
            Event updated successfully!
          </Alert>
        )}
        <Event {...event.results[0]} setEvents={setEvent} eventPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
    </Row>
  );
}

export default EventPage;
