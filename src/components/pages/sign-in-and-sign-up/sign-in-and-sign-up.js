import React from "react";
import SignIn from "../../sign-in/sign-in";
import Signup from "../../sign-up/sign-up";
import "./sign-in-and-sign-up.scss";

class SignInAndSignUp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sign-in-and-sign-up">
        <SignIn />
        <Signup />
      </div>
    );
  }
}

export default SignInAndSignUp;
