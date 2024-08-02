import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <NavLink to="/">
        <Navbar.Brand className={styles.logo}>connectify.</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="text-center">
          <NavLink className={styles.NavLink} to="/">
          <i class="fa-solid fa-house fa-xl"></i> Home
          </NavLink>
          <NavLink className={styles.NavLink} to="/signin">
          <i class="fa-solid fa-right-to-bracket fa-xl"></i> Log in
          </NavLink>
          <NavLink className={styles.NavLink} to="/signup">
          <i class="fa-solid fa-user-pen fa-xl"></i> Sign up
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
