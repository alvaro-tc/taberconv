import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import Select from 'react-select';
import { fetchEventById, updateEvent } from '../api/ApiCollection';

interface EditEventProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
}

const EditEvent: React.FC<EditEventProps> = ({ isOpen, setIsOpen, eventId }) => {
  const [showModal, setShowModal] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(0);
  const [fecha, setFecha] = useState('');
  const [formIsEmpty, setFormIsEmpty] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      const event = await fetchEventById(eventId);
      setDescripcion(event.descripcion);
      setEstado(event.estado);
      setFecha(event.fecha);
    };
    if (isOpen) {
      loadEvent();
    }
  }, [eventId, isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateEvent({
        id: eventId,
        descripcion,
        estado,
        fecha,
      });
      toast.success('Event updated successfully!');
      setIsOpen(false);
      window.location.reload(); // Recargar la página
    } catch (error) {
      toast.error('Failed to update event');
      console.error(error);
    }
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (descripcion === '' || fecha === '') {
      setFormIsEmpty(true);
    } else {
      setFormIsEmpty(false);
    }
  }, [descripcion, fecha, estado]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
          showModal ? 'translate-y-0' : 'translate-y-full'
        } ${showModal ? 'opacity-100' : 'opacity-0'}`}
      >
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
          <span className="text-2xl font-bold">Editar evento</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Descripción</span>
            </div>
            <input
              type="text"
              placeholder="Descripción"
              className="input input-bordered w-full"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(element) => setDescripcion(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Fecha</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              name="fecha"
              id="fecha"
              value={fecha}
              onChange={(element) => setFecha(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Estado</span>
            </div>
            <Select
              classNamePrefix="react-select"
              options={[
                { value: 0, label: 'Activo' },
                { value: 1, label: 'Pendiente' },
                { value: 2, label: 'Terminado' },
              ]}
              value={{ value: estado, label: estado === 0 ? 'Activo' : estado === 1 ? 'Pendiente' : 'Terminado' }}
              onChange={(selectedOption) => setEstado(selectedOption?.value || 0)}
              placeholder="Seleccione uno"
            />
          </label>
          <button
            className="mt-5 btn btn-primary btn-block col-span-full font-semibold"
            type="submit"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;