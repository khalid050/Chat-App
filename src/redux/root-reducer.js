import { combineReducers } from "redux";
import { signInReducer } from "./authentication/auth.reducers";

const rootReducer = combineReducers({
  user: signInReducer,
});

export default rootReducer;
