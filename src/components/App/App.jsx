import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import SignInAndSignUp from "../pages/sign-in-and-sign-up/sign-in-and-sign-up";
import HomePage from "../pages/homepage/homepage";
import { withCookies } from "react-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, cookies } = this.props;
    console.log("cookies", cookies);
    console.log(state);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            cookies.get("auth_token") ? (
              <HomePage cookies={this.props.cookies}/>
            ) : (
              <SignInAndSignUp />
            )
          }
        ></Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies
  };
};

// const mapStateToProps = state => {
//   const { isLoggedIn } = state.userCredentials;
//   return { isLoggedIn };
// };
export default withCookies(connect(mapStateToProps, null)(App));
