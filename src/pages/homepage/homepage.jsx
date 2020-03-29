import React from "react";
import { fetchAuth } from "../../redux/authentication/auth.actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { history, isLoggedIn, signInUser } = this.props;
    signInUser();
    if (!isLoggedIn) {
      history.replace("/");
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to the homepage</h1>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
