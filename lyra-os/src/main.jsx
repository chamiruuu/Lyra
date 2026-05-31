import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const container = document.getElementById("app") || document.getElementById("root")
if (!container) {
  throw new Error('Root element not found. Expected an element with id "app" or "root".')
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);