import { combineReducers } from "redux";
import { authReducer } from "./authentication/auth.reducers";

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
