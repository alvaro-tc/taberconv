// frontend/src/pages/Login.tsx
import { useState } from 'react';
import ChangeThemes from '../components/ChangesThemes';
import { DiReact } from 'react-icons/di';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchCurrentUser } from '../api/ApiCollection';
import { startTokenRefresh } from '../utils/tokenRefresh';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      if (data) {
        const accessToken = data.tokens.access;
        const refreshToken = data.tokens.refresh;

        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // console.log('JWT Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);

        // Inicia la renovación automática del token
        startTokenRefresh();

        // Llamar a la API /api/whoami para obtener los roles del usuario
        const whoamiData = await fetchCurrentUser();
        const roles = whoamiData.user_details.roles;

        localStorage.setItem('userRoles', JSON.stringify(roles)); // Guarda los roles en el localStorage

        console.log('User Roles:', roles);

        navigate('/');
      } else {
        console.error('Error de autenticación');
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="flex items-center gap-1 xl:gap-2">
            <DiReact className="text-4xl sm:text-4xl xl:text-6xl 2xl:text-6xl text-primary animate-spin-slow -ml-3" />
            <span className="text-[18px] leading-[1.2] sm:text-lg xl:text-3xl 2xl:text-3xl font-semibold text-base-content dark:text-neutral-200">
              React Dashboard
            </span>
          </div>
          <span className="xl:text-xl font-semibold">
            Hello, 👋 Welcome Back!
          </span>
          <div className="w-full flex flex-col items-stretch gap-3">
            <label className="input input-bordered min-w-full flex items-center gap-2">
              <input
                type="text"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div
              onClick={handleLogin}
              className="btn btn-block btn-primary"
            >
              Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;