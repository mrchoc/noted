import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Notes from "./components/notes";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <main>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/notes"
              render={(props) => <Notes {...props} user={user} />}
            />
            <Redirect from="/" exact to="/notes" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
