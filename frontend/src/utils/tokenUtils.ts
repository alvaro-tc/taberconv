// frontend/src/utils/tokenUtils.ts
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
    exp: number;
    iat: number;
  }
  
  export const isTokenExpiringSoon = (token: string, thresholdInSeconds: number = 300): boolean => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      const expirationTime = exp;
      const timeLeft = expirationTime - currentTime;
  
      //console.log(`Token expires in ${timeLeft} seconds`);
  
      return timeLeft < thresholdInSeconds;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };