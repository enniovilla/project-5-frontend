import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setShowModal(false);
    } catch (err) {
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const loggedInIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/events"
      >
        <i class="fa-solid fa-bars-staggered fa-xl"></i>Events
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/events/create"
      >
        <i class="fa-solid fa-pen-to-square fa-xl"></i>Create Event
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/my_events"
      >
        <i class="fa-solid fa-calendar fa-xl"></i>My Events
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/my_attendances"
      >
        <i class="fa-solid fa-clipboard-user fa-xl"></i>My Attendances
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/my_favorites"
      >
        <i class="fa-solid fa-star fa-xl"></i>Favorites
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <i class="fa-solid fa-user fa-xl"></i>{currentUser?.username}'s Profile
      </NavLink>
      <Nav.Link
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="#"
        onClick={handleShowModal}
      >
        <i class="fa-solid fa-right-to-bracket fa-xl"></i>Sign out
      </Nav.Link>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/signin"
      >
        <i class="fa-solid fa-right-to-bracket fa-xl"></i>Sign in
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
        to="/signup"
      >
        <i class="fa-solid fa-user-pen fa-xl"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="md"
        fixed="top"
      >
        <NavLink to="/">
          <Navbar.Brand className={styles.logo}>connectify.</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-center">
            <NavLink
              className={`${styles.NavLink} mt-1 mb-1 mt-md-0 mb-md-0`}
              to="/"
            >
              <i class="fa-solid fa-house fa-xl"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
