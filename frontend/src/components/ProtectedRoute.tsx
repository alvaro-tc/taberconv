// frontend/src/components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpiringSoon } from '../utils/tokenUtils';
import { refreshToken } from '../api/ApiCollection';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token && !isTokenExpiringSoon(token);
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');

  useEffect(() => {
    const refreshTokenIfNeeded = async () => {
      if (token && isTokenExpiringSoon(token)) {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        try {
          await refreshToken(refreshTokenValue || '');
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
    };

    refreshTokenIfNeeded();
  }, [token]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;