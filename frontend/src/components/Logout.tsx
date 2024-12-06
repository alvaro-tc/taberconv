// frontend/src/components/Logout.tsx
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/ApiCollection';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      console.log('API response:', data);

      // Redirigir al usuario a la página de login
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;