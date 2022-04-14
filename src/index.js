import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "store/index";
import { BrowserRouter } from "react-router-dom";

// CssBaseline :  Normalizes styles . Corrects browser inconsistencies.

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
