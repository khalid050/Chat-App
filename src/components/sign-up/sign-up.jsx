import React, { useState } from "react";
import "./sign-up.scss";
import { connect } from "react-redux";

const Signup = ({ signUp }) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
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

  const handleSignUp = () => {
    fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((credentials) => {
        signUp(credentials);
      })
      .catch(() => {
        alert("Invalid credentials");
      });
  };

  return (
    <form className="sign-up__form">
      <h3 className="sign-up__form--header">Create Account</h3>
      <span className="sign-up__form__span--first-name">First Name</span>
      <input
        className="sign-up__form__input--first-name"
        name="firstName"
        onChange={(event) => handleChange(event)}
        value={credentials.firstName}
      ></input>
      <span className="sign-up__form__span--last-name">Last Name</span>
      <input
        className="sign-up__form__input--last-name"
        name="lastName"
        onChange={(event) => handleChange(event)}
        value={credentials.lastName}
      ></input>
      <span className="sign-up__form__span--email">Email</span>
      <input
        className="sign-up__form__input--email"
        name="email"
        onChange={(event) => handleChange(event)}
        value={credentials.email}
      />
      <span className="sign-up__form__span--password">Password</span>
      <input
        className="sign-up__form__input--password"
        name="password"
        onChange={(event) => handleChange(event)}
        value={credentials.password}
      />
      <input
        className="sign-up__form--submit-btn"
        type="button"
        value="Sign up"
        onClick={handleSignUp}
      ></input>{" "}
    </form>
  );
};

export default Signup;
