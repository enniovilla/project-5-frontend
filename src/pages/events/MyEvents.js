import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsFeed.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

function MyEvents({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?${filter}`);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchEvents();
  }, [filter, pathname]);

  return (
    <Row className="h-100 d-flex justify-content-center align-items-center">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {events.results.length ? (
              events.results.map((event) => (
                <Event key={event.id} {...event} setEvents={setEvents} />
              ))
            ) : (
              <Container className={`d-flex flex-column justify-content-center align-items-center ${appStyles.Content}`}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={`d-flex flex-column justify-content-center align-items-center ${appStyles.Content}`}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default MyEvents;
