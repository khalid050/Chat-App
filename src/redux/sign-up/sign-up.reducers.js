import { SIGN_UP_USER } from "./sign-up.constants";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      const { firstName, lastName, email, password } = action.payload;
      return { ...state, firstName, lastName, email, password };
    default:
      return state;
  }
};
