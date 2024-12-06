import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import Select from 'react-select';
import { fetchPositions, fetchChurches, updateGuest, fetchGuestById, fetchChurchById, fetchPositionById } from '../api/ApiCollection';

interface EditDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  guestId: string;
}

const EditData: React.FC<EditDataProps> = ({ slug, isOpen, setIsOpen, guestId }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [positionId, setPositionId] = useState(0);
  const [churchId, setChurchId] = useState(0);
  const [formIsEmpty, setFormIsEmpty] = useState(true);

  const [positions, setPositions] = useState<{ id: number; descripcion: string }[]>([]);
  const [churches, setChurches] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const positionsData = await fetchPositions();
      const churchesData = await fetchChurches();
      const guestData = await fetchGuestById(guestId);
      const positionData = await fetchPositionById(guestData.position_id);
      const churchData = await fetchChurchById(guestData.church_id);

      setPositions(positionsData);
      setChurches(churchesData);
      setNombre(guestData.nombre);
      setApellidos(guestData.apellidos);
      setEmail(guestData.email);
      setTelefono(guestData.telefono);
      setPositionId(guestData.position_id);
      setChurchId(guestData.church_id);
      setPreview(guestData.img || null);
    };
    loadData();
  }, [guestId]);

  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateGuest(guestId, {
        nombre,
        apellidos,
        email,
        telefono,
        position_id: positionId,
        church_id: churchId,
      });
      toast.success('Data updated successfully!');
      setIsOpen(false);
      window.location.reload(); // Recargar la página
    } catch (error) {
      toast.error('Failed to update data');
      console.error(error);
    }
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (
      nombre === '' ||
      apellidos === '' ||
      telefono === '' ||
      positionId === 0 ||
      churchId === 0
    ) {
      setFormIsEmpty(true);
    } else {
      setFormIsEmpty(false);
    }
  }, [nombre, apellidos, email, telefono, positionId, churchId]);

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
          <span className="text-2xl font-bold">Editar {slug}</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nombre</span>
            </div>
            <input
              type="text"
              placeholder="Nombre"
              className="input input-bordered w-full"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(element) => setNombre(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Apellidos</span>
            </div>
            <input
              type="text"
              placeholder="Apellidos"
              className="input input-bordered w-full"
              name="apellidos"
              id="apellidos"
              value={apellidos}
              onChange={(element) => setApellidos(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
              id="email"
              value={email}
              onChange={(element) => setEmail(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Telefono</span>
            </div>
            <input
              type="text"
              placeholder="Telefono"
              className="input input-bordered w-full"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={(element) => setTelefono(element.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Posicion</span>
            </div>
            <Select
              classNamePrefix="react-select"
              options={positions.map((position) => ({
                id: position.id,
                descripcion: position.descripcion,
              }))}
              value={positions.find((position) => position.id === positionId) || null}
              getOptionLabel={(option) => option.descripcion}
              getOptionValue={(option) => option.id.toString()}
              onChange={(selectedOption) => setPositionId(selectedOption?.id || 0)}
              placeholder="Select one"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Iglesia</span>
            </div>
            <Select
              classNamePrefix="react-select"
              options={churches.map((church) => ({
                id: church.id,
                nombre: church.nombre,
              }))}
              value={churches.find((church) => church.id === churchId) || null}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id.toString()}
              onChange={(selectedOption) => setChurchId(selectedOption?.id || 0)}
              placeholder="Select one"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Suba una foto de perfil</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={loadImage}
            />
          </label>
          {preview && preview !== '' && (
            <div className="w-full flex flex-col items-start gap-3">
              <span>Vista Previa</span>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={preview} alt="profile-upload" />
                </div>
              </div>
            </div>
          )}
          <button
            className={`mt-5 btn ${formIsEmpty ? 'btn-disabled' : 'btn-primary'} btn-block col-span-full font-semibold`}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditData;