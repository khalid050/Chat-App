import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import SignInAndSignUp from "../../pages/sign-in-and-sign-up/sign-in-and-sign-up";
import HomePage from "../../pages/homepage/homepage";
import { fetchAuth } from "../../redux/authentication/auth.actions";
import { Redirect } from "react-router";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { signInUser } = this.props;
    signInUser();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* <PrivateRoute
          path="/home"
          component={HomePage}
          isLoggedIn={isLoggedIn}
        /> */}
        <Route
          path="/"
          component={!isLoggedIn ? SignInAndSignUp : HomePage}
        ></Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  const { isLoggedIn } = state.userCredentials;
  return { isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    signInUser: () => {
      dispatch(fetchAuth());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
