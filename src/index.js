import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/index.scss";
import "react-image-lightbox/style.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
