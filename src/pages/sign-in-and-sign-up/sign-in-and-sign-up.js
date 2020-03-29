import React from "react";
import Signup from "../../components/sign-up/sign-up";
import "./sign-in-and-sign-up.scss";
import SignIn from "../../components/sign-in/sign-in";

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
