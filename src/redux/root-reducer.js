import { combineReducers } from "redux";
import { authReducer } from "./authentication/auth.reducers";
import { alertReducer } from "./authentication/alerts.reducers";

const rootReducer = combineReducers({
  user: authReducer,
  alert: alertReducer,
});

export default rootReducer;
