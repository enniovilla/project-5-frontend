import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Button.module.css";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    favorite_id,
    attendance_id,
    attendance_count,
    title,
    description,
    event_image,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Event}>
      <Card.Body>
        <Media className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-grow-1 justify-content-center pt-3">
            {title && <Card.Title className="text-center">{title}</Card.Title>}
          </div>
          <div className="ms-auto">
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't favorite your own event!</Tooltip>}
              >
                <i className="fa-regular fa-star fa-xl" />
              </OverlayTrigger>
            ) : favorite_id ? (
              <span onClick={() => {}}>
                <i className={`fa-regular fa-star fa-xl ${styles.Star}`} />
              </span>
            ) : currentUser ? (
              <span onClick={() => {}}>
                <i
                  className={`fa-regular fa-star fa-xl ${styles.StarOutline}`}
                />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to favorite events!</Tooltip>}
              >
                <i className="fa-regular fa-star fa-xl" />
              </OverlayTrigger>
            )}
            {is_owner && eventPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}>
        <Card.Img src={event_image} alt={title} />
      </Link>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            Hosted by
            <Link
              to={`/profiles/${profile_id}`}
              className="d-flex align-items-center ms-2"
            >
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <i class="fa-solid fa-users fa-xl" />
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
              variant="secondary"
              disabled
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color}`}
            >
              Attend
            </Button>
          </OverlayTrigger>
        ) : attendance_id ? (
          <Button
            variant="success"
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Color}`}
          >
            Attending
          </Button>
        ) : currentUser ? (
          <Button
            variant="outline-primary"
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
  );
};

export default Event;
