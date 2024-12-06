// frontend/src/pages/Unauthorized.tsx
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">403 - No Autorizado</h1>
        <p className="mt-4">No tienes permiso para acceder a esta página.</p>
        <button onClick={() => navigate('/')} className="btn mt-4">
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;