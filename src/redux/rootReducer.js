import { combineReducers } from "redux";
import { signUpReducer } from "./sign-up/sign-up.reducers";
import { signInUserReducer } from "./sign-in/sign-in.reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["userCredentials"]
};

const reducers = combineReducers({
  userCredentials: signInUserReducer
});

export default persistReducer(persistConfig, reducers);
