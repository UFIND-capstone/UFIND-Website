// src/App.jsx
import React from "react";
import { NotificationProvider } from "./context/contextNotification";
import NotificationBanner from "./components/user/notification"
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <NotificationProvider>
      <NotificationBanner />
      <AppRoutes />
    </NotificationProvider>
  );
};

export default App;
