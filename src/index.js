import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);

