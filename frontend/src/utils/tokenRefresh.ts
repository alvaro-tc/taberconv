// frontend/src/utils/tokenRefresh.ts
import { refreshToken } from '../api/ApiCollection';

const refreshTokenInterval = 15 * 60 * 1000; // 15 minutos

export const startTokenRefresh = () => {
  setInterval(async () => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (refreshTokenValue) {
      try {
        await refreshToken(refreshTokenValue);
        console.log('Token de acceso refrescado');
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRoles');
        window.location.href = '/login';
      }
    }
  }, refreshTokenInterval);
};