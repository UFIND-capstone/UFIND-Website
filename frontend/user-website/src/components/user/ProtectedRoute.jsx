import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not authenticated, redirect to the login page
  if (!user) {
    if (user.role !== 'user'){
      return <Navigate to="/admin/adminLogin" />;
    }
    if (user.role !== 'admin'){
      return <Navigate to="/login" />;
    }

  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
