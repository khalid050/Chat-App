import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

export default { store, persistor };
