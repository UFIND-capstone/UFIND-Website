import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // If there's no user, redirect to appropriate login
  if (!user) {
    return <Navigate to={adminOnly ? "/admin/adminLogin" : "/"} />;
  }

  // Check role-based access
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />; // Redirect non-admins trying to access admin routes
  }

  if (!adminOnly && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />; // Redirect admins trying to access user routes
  }

  // If all checks pass, render the protected content
  return children;
};

export default ProtectedRoute;