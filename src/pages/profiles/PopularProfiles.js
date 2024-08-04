import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p className={mobile ? "mb-2" : styles.Header}>
            {mobile ? "Most followed profiles." : "Most Followed Profiles"}
          </p>
          <div
            className={
              mobile
                ? "d-flex flex-wrap justify-content-center"
                : styles.ProfilesContainer
            }
          >
            {popularProfiles.results.slice(0, mobile ? 4 : 5).map((profile) => (
              <Profile
                key={profile.id}
                profile={profile}
                className={mobile ? "m-2" : styles.ProfileItem}
                mobile={mobile}
              />
            ))}
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
