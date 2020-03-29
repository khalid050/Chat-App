import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { signInUserReducer } from "./authentication/auth.reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userCredentials"]
};

const rootReducer = combineReducers({
  userCredentials: signInUserReducer
});

export default persistReducer(persistConfig, rootReducer);
