// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('isAdmin') === 'true';

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  return (
    <>
      <div style={{ textAlign: 'right', margin: '10px' }}>
        <button onClick={handleLogout} style={{ padding: '6px 12px' }}>
          Logout
        </button>
      </div>
      {children}
    </>
  );
};

export default ProtectedRoute;
