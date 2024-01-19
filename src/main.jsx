import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import AccessProvider from "./context/AccesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AccessProvider>
        <App />
      </AccessProvider>
    </ThemeProvider>
  </React.StrictMode>
);
