import {
  INITIATE_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
} from "./auth.constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function signInReducer(state = initialState, action) {
  switch (action.type) {
    case INITIATE_SIGN_IN:
      return {
        loggingIn: true,
        user: action.user,
      };
    case SIGN_IN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case SIGN_IN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
