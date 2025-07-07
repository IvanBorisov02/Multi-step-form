import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

import { AccountProvider } from "./contexts/AccountContext";
import store from "./store";

import "./index.css";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AccountProvider>
        <App />
      </AccountProvider>
    </Provider>
  </React.StrictMode>
);
