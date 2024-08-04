import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import "./api/axiosDefaults";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsFeed from "./pages/events/EventsFeed";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import MyEvents from "./pages/events/MyEvents";
import EventEditForm from "./pages/events/EventEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route exact path="/events" render={() => <EventsFeed />} />
          <Route
            exact
            path="/my_events"
            render={() => (
              <MyEvents
                message="No results found. You might not have created an event yet. Adjust the search keyword or create a new event."
                filter={`owner__profile=${profile_id}&ordering=-created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/my_attendances"
            render={() => (
              <MyEvents
                message="No results found. You might not have marked as attending an event yet. Adjust the search keyword or mark as attending an event."
                filter={`attendance__owner__profile=${profile_id}&ordering=-attendance__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/my_favorites"
            render={() => (
              <MyEvents
                message="No results found. You might not have favorited an event yet. Adjust the search keyword or favorite an event."
                filter={`favorites__owner__profile=${profile_id}&ordering=-favorites__created_at&`}
              />
            )}
          />
          <Route exact path="/events/:id/edit" render={() => <EventEditForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
