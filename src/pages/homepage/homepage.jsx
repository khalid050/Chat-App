import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/authentication/auth.actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        <h1>Welcome to the homepage</h1>
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default HomePage;
