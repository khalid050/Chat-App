import { SIGN_UP_USER } from "./sign-up.constants";

export const signUpUser = credentials => ({
  type: SIGN_UP_USER,
  payload: credentials
});
