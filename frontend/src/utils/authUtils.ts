// frontend/src/utils/authUtils.ts
import * as jwtDecode from 'jwt-decode';

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return exp < currentTime;
  } catch (error) {
    return true; // Si falla la decodificación, asumimos que está expirado
  }
};