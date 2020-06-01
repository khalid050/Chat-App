import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import SignInAndSignUp from "../../pages/sign-in-and-sign-up/sign-in-and-sign-up";
import HomePage from "../../pages/homepage/homepage";
import { PrivateRoute } from "../private-route/private-route";
import { Redirect } from "react-router";
import { history } from "../../../utils/history";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={SignInAndSignUp} />
          </div>
        </Router>
      </Switch>
    );
  }
}

export default App;
