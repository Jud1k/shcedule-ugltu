import { Navigate, Outlet } from 'react-router';
import { isLoggedIn } from '../hooks/useAuth';
import React from 'react';

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicOnlyRoute;
