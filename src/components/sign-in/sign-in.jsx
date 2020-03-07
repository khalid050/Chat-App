import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./sign-in.scss";
import { signInUser } from "../../redux/sign-in/sign-in.actions";

const SignIn = ({ signInUser, history }) => {
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

  const signIn = () => {
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
          throw new Error();
        }
      })
      .then(data => data.json())
      .then(res => {
        signInUser(res);
      })
      .then(() => {
        history.push("/");
      })

      .catch(err => {
        alert("Invalid credentials");
      });
  };

  return (
    <form className="sign-in__form">
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
        type="button"
        value="Sign In"
        onClick={signIn}
      ></input>{" "}
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signInUser: credentials => {
      dispatch(signInUser(credentials));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
