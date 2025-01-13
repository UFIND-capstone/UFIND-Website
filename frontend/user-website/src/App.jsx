// src/App.jsx
import React from "react";
import { NotificationProvider } from "./context/contextNotification";
import NotificationBanner from "./components/user/notification"
import { AppRoutes } from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

const ConditionalNotificationWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return children;
  }

  return (
    <NotificationProvider>
      <NotificationBanner />
      {children}
    </NotificationProvider>
  );
};

const App = () => {
  return (
    <AppRoutes>
      <ConditionalNotificationWrapper />
    </AppRoutes>
  );
};

export default App;
