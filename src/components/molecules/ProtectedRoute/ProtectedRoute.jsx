import React, { use } from 'react';

import './ProtectedRoute.css';
import { useLocation,Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider.jsx';
function ProtectedRoute({children}) {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  
  return children;
}


export default ProtectedRoute;
