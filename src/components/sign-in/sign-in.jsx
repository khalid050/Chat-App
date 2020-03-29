import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import "./sign-in.scss";
import { signIn } from "../../redux/authentication/auth.actions";

const SignIn = ({ signInUser }, props) => {
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    let { name } = event.target;
    let { value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const signIn = e => {
    e.preventDefault();
    const { email, password } = credentials;

    fetch("/auth/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 200) {
          return res;
        } else {
          return;
        }
      })
      .then(data => data.json())
      .then(res => {
        signInUser(res);
      })

      .catch(err => {
        alert("Invalid credentials");
      });
  };

  return (
    <form className="sign-in__form" onSubmit={e => signIn(e)}>
      <h3 className="sign-in__form--header">Log In</h3>
      <span className="sign-in__form__span--email">Email</span>
      <input
        className="sign-in__form__input--email"
        name="email"
        onChange={event => handleChange(event)}
        value={credentials.email}
      />
      <span className="sign-in__form__span--password">Password</span>
      <input
        className="sign-in__form__input--password"
        name="password"
        onChange={event => handleChange(event)}
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

const mapDispatchToProps = dispatch => {
  return {
    signInUser: credentials => {
      dispatch(signIn(credentials));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
