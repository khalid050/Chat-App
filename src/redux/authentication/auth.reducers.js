import { INITIATE_SIGN_IN, CHECK_AUTHORIZATION } from "./auth.constants";
let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  cookie: "",
  isLoggedIn: false
};

export const signInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_SIGN_IN:
      const { user } = action.payload;
      const { firstName, lastName, email } = user;
      const { token } = action.payload;

      return {
        ...state,
        firstName,
        lastName,
        email,
        cookie: token,
        isLoggedIn: true
      };
    case CHECK_AUTHORIZATION:
      let { isLoggedIn } = action.payload;
      return { ...state, isLoggedIn };

    default:
      return state;
  }
};
