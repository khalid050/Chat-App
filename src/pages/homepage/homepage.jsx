import React from "react";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to the homepage</h1>
      </div>
    );
  }
}

export default HomePage;
