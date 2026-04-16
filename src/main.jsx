import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { NotificationProvider } from "./context/NotificationContext.jsx";
import { AppProvider } from "./context/AppContext.jsx"; // ✅ FIX extension

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider> {/* ✅ MUST wrap */}
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AppProvider>
  </React.StrictMode>
);