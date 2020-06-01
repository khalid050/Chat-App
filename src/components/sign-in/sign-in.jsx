import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/authentication/auth.actions";

import "./sign-in.scss";

const SignIn = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let { name } = event.target;
    let { value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const { dispatch } = props;
    if (email && password) {
      dispatch(login(email, password));
    }
  };

  return (
    <form className="sign-in__form" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="sign-in__form--header">Log In</h3>
      <span className="sign-in__form__span--email">Email</span>
      <input
        className="sign-in__form__input--email"
        name="email"
        onChange={(event) => handleChange(event)}
        value={credentials.email}
      />
      <span className="sign-in__form__span--password">Password</span>
      <input
        className="sign-in__form__input--password"
        name="password"
        onChange={(event) => handleChange(event)}
        value={credentials.password}
      />
      <input
        className="sign-in__form--submit-btn"
        type="submit"
        value="Sign In"
      ></input>{" "}
    </form>
  );
};

function mapStateToProps(state) {
  const { loggingIn } = state.user;
  return {
    loggingIn,
  };
}
export default connect(mapStateToProps, null)(SignIn);
