import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="login.jsx" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
