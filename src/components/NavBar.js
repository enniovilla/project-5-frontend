import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Navbar.Brand className={styles.logo}>connectify.</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="text-center">
          <Nav.Link className="mx-3">Home</Nav.Link>
          <Nav.Link className="mx-3">Log in</Nav.Link>
          <Nav.Link className="mx-3">Sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;