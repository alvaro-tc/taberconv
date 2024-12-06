import React from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface DeleteEventProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ isOpen, setIsOpen, onDelete }) => {
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div className={`w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99] ${showModal ? 'block' : 'hidden'}`}>
      <div className="w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5">
        <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
          <button
            onClick={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
            className="absolute top-5 right-3 btn btn-ghost btn-circle"
          >
            <HiOutlineXMark className="text-xl font-bold" />
          </button>
          <span className="text-2xl font-bold">Eliminar</span>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <p>Estas seguro de eliminar?</p>
          <div className="w-full flex justify-around">
            
            <button
              className="btn btn-primary"
              onClick={() => {
                onDelete();
                setShowModal(false);
                setIsOpen(false);
              }}
            >
              Eliminar
            </button>
            <button
              className="btn btn"
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;