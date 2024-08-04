import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import { Alert } from "react-bootstrap";
import appStyles from "../../App.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function EventPage() {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const image = currentUser?.image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }, { data: comments }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setEvent({ results: [event] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");

  return (
    <Container fluid>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8} xs={12}>
          {success === "true" && (
            <Alert variant="success" className="text-center mb-4">
              Event updated successfully!
            </Alert>
          )}
          <Event {...event.results[0]} setEvents={setEvent} eventPage />
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={image}
                event={id}
                setEvent={setEvent}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setEvent={setEvent}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? (
              <div className="text-center mt-3">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <div className="text-center mt-3">No comments... yet!</div>
            )}
          </Container>
        </Col>
        <Col className="d-lg-none py-2 p-0 p-lg-2">
          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={image}
                event={id}
                setEvent={setEvent}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              comments.results.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))
            ) : currentUser ? (
              <div className="text-center mt-3">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <div className="text-center mt-3">No comments... yet!</div>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default EventPage;
