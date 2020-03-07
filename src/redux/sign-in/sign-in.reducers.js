import { SIGN_IN_USER_CREDENTIALS } from "./sign-in.constants";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  cookie: "",
  isLoggedIn: false
};

export const signInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER_CREDENTIALS:
      const { user } = action.payload;
      const { firstName, lastName, email } = user;
      const { token } = action.payload;
      return Object.assign({}, state, {
        firstName,
        lastName,
        email,
        cookie: token,
        isLoggedIn: true
      });
    default:
      return state;
  }
};
