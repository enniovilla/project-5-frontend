import React, { useState } from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
  Button,
  Modal,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    comments_count,
    favorite_id,
    attendance_id,
    attendance_count,
    title,
    description,
    event_image,
    event_date,
    eventPage,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {}
    setShowModal(false);
  };

  const handleFavorite = async () => {
    try {
      const { data } = await axiosRes.post("/favorites/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                favorites_count: event.favorites_count + 1,
                favorite_id: data.id,
              }
            : event;
        }),
      }));
    } catch (err) {}
  };

  const handleUnfavorite = async () => {
    try {
      await axiosRes.delete(`/favorites/${favorite_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                favorites_count: event.favorites_count - 1,
                favorite_id: null,
              }
            : event;
        }),
      }));
    } catch (err) {}
  };

  const handleAttend = async () => {
    try {
      const { data } = await axiosRes.post("/attendances/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                attendance_count: event.attendance_count + 1,
                attendance_id: data.id,
              }
            : event;
        }),
      }));
    } catch (err) {}
  };

  const handleUnattend = async () => {
    try {
      await axiosRes.delete(`/attendances/${attendance_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                attendance_count: event.attendance_count - 1,
                attendance_id: null,
              }
            : event;
        }),
      }));
    } catch (err) {}
  };

  return (
    <>
      <Card className={styles.Event}>
        <Card.Body>
          <Media className="d-flex align-items-center justify-content-between">
            <Link
              to={`/events/${id}`}
              className="d-flex flex-grow-1 justify-content-center pt-3"
            >
              {title && (
                <Card.Title className="text-center">{title}</Card.Title>
              )}
            </Link>
            <div className="ms-auto d-flex align-items-center">
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>You can't favorite your own event!</Tooltip>
                  }
                >
                  <i className="fa-regular fa-star" />
                </OverlayTrigger>
              ) : favorite_id ? (
                <span onClick={handleUnfavorite}>
                  <i className={`fa-solid fa-star fa-xl ${styles.Star}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleFavorite}>
                  <i
                    className={`fa-regular fa-star fa-xl ${styles.StarOutline}`}
                  />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Sign in to favorite events!</Tooltip>}
                >
                  <i className="fa-regular fa-star fa-xl" />
                </OverlayTrigger>
              )}
              {is_owner && eventPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={() => setShowModal(true)}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/events/${id}`}>
          <Card.Img src={event_image} alt={title} />
        </Link>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              Hosted by{" "}
              <Link
                to={`/profiles/${profile_id}`}
                className="d-flex align-items-center ms-2"
              >
                 {owner}
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-calendar-days fa-xl" />
              {event_date}
              <i className="fa-solid fa-users fa-xl ml-3" />
              {attendance_count}
              <Link
                to={`/events/${id}`}
                className="d-flex align-items-center ml-3"
              >
                <i className="fa-regular fa-comment fa-xl me-2" />
                {comments_count}
              </Link>
            </div>
          </div>
          <div className="mt-3 p-3 text-center">
            {description && <Card.Text>{description}</Card.Text>}
          </div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>You can't mark attendance to your own event!</Tooltip>
              }
            >
              <Button
                disabled
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color} ${btnStyles.AttendingDeactivated}`}
              >
                Attend
              </Button>
            </OverlayTrigger>
          ) : attendance_id ? (
            <Button
              onClick={handleUnattend}
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color} ${btnStyles.Attending}`}
            >
              Attending
            </Button>
          ) : currentUser ? (
            <Button
              onClick={handleAttend}
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color}`}
            >
              Attend
            </Button>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Sign in to attend events!</Tooltip>}
            >
              <Button
                disabled
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color}`}
              >
                Attend
              </Button>
            </OverlayTrigger>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Event;
