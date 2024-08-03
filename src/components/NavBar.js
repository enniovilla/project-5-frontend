import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} to="/feed">
      <i class="fa-solid fa-users fa-xl"></i>Feed
      </NavLink>
      <NavLink className={styles.NavLink} to="/events/create">
      <i class="fa-solid fa-pen-to-square fa-xl"></i>Create Event
      </NavLink>
      <NavLink className={styles.NavLink} to="/my_events">
      <i class="fa-solid fa-calendar fa-xl"></i>My Events
      </NavLink>
      <NavLink className={styles.NavLink} to="/my_attendances">
      <i class="fa-solid fa-clipboard-user fa-xl"></i>My Attendances
      </NavLink>
      <NavLink className={styles.NavLink} to="/favorites">
      <i class="fa-solid fa-star fa-xl"></i>Favorites
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      ><Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
      <Nav.Link className={styles.NavLink}>
      <i class="fa-solid fa-right-to-bracket fa-xl"></i>Sign out
      </Nav.Link>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} to="/signin">
        <i class="fa-solid fa-right-to-bracket fa-xl"></i>Sign in
      </NavLink>
      <NavLink className={styles.NavLink} to="/signup">
        <i class="fa-solid fa-user-pen fa-xl"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <NavLink to="/">
        <Navbar.Brand className={styles.logo}>connectify.</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className=" ml-auto text-center">
          <NavLink className={styles.NavLink} to="/">
            <i class="fa-solid fa-house fa-xl"></i>Home
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
