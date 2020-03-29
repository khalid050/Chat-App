import {
  INITIATE_SIGN_IN,
  SIGN_UP,
  CHECK_AUTHORIZATION
} from "./auth.constants";

export const signIn = credentials => ({
  type: INITIATE_SIGN_IN,
  payload: credentials
});

export const signUp = credentials => {
  return {
    type: SIGN_UP,
    payload: credentials
  };
};

export const setLoginStatus = isLoggedIn => {
  return {
    type: CHECK_AUTHORIZATION,
    payload: isLoggedIn
  };
};

export const fetchAuth = () => {
  return dispatch => {
    fetch("/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        dispatch(setLoginStatus({ isLoggedIn: true }));
      } else {
        dispatch(setLoginStatus({ isLoggedIn: false }));
      }
    });
  };
};
