import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/PopularEvents.module.css";

const PopularEvents = () => {
  const [eventData, setEventData] = useState({
    pageEvent: { results: [] },
    popularEvents: { results: [] },
  });
  const { popularEvents } = eventData;
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/events/?ordering=-attendance_count&limit=5"
        );
        setEventData((prevState) => ({
          ...prevState,
          popularEvents: data,
        }));
      } catch (err) {
      }
    };

    handleMount();
  }, [currentUser]);

  const handleClick = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <Container className={appStyles.Content}>
      {popularEvents.results.length ? (
        <>
          <div className={styles.Title}>top 5 popular events</div>
          {popularEvents.results.slice(0, 5).map((event) => (
            <Col
              key={event.id}
              className="mb-4"
              onClick={() => handleClick(event.id)}
            >
              <Card className="h-100" style={{ cursor: "pointer" }}>
                <Card.Img
                  variant="top"
                  src={event.event_image}
                  alt={event.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>Hosted by {event.owner}</Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-calendar-days fa-xl" />
                    {event.event_date}
                  </Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-users fa-xl ml-3" />{" "}
                    {event.attendance_count}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularEvents;
