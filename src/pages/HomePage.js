import React from "react";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>connectify.</h1>
      <h2>Discover. Connect. Engage.</h2>
      <p>We're thrilled to have you here!</p>
      <p>
        <span className={styles.font}>connectify.</span> is your go-to platform
        for meeting like-minded individuals, exploring new interests, and
        building meaningful connections. Whether you're looking to join a group,
        attend an event, or start your own community, our vibrant network is
        here to support you every step of the way.
      </p>
      <p>
        Join us today and start your journey towards unforgettable experiences
        and lifelong friendships.
      </p>
      <p>Let's make something amazing together! Welcome aboard!</p>
    </div>
  );
};

export default HomePage;
