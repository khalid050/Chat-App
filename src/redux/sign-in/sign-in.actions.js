import { SIGN_IN_USER_CREDENTIALS } from "./sign-in.constants";

export const signInUser = credentials => {
  return {
    type: SIGN_IN_USER_CREDENTIALS,
    payload: credentials
  };
};
