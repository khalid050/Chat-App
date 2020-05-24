import {
  INITIATE_SIGN_IN,
  INITIATE_SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT,
} from "./auth.constants";

import { alertFailure, alertSuccess, clear } from "./alerts.actions";
import { signIn, signOut } from "../../../utils/auth";
import { history } from "../../../utils/history";

export const initiateSignIn = (credentials) => ({
  type: INITIATE_SIGN_IN,
  payload: credentials,
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const initiateSignUp = (credentials) => ({
  type: INITIATE_SIGN_UP,
  payload: credentials,
});

export const signUpSuccess = (credentials) => ({
  type: SIGN_UP_SUCCESS,
  payload: credentials,
});

export const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export function login(email, password) {
  return (dispatch) => {
    dispatch(initiateSignIn({ email }));
    signIn(email, password).then(
      (user) => {
        dispatch(signInSuccess(user));
        history.push("/");
      },
      (error) => {
        dispatch(signInFailure(error));
        dispatch(alertFailure(error));
      }
    );
  };
}

export function signUp() {
  return (dispatch) => {};
}

export function logout() {
  signOut();
  history.push("/login");
  return {
    type: LOGOUT,
  };
}
