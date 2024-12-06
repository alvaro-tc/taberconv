import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchChurches, createChurch, updateChurch, deleteChurch } from '../api/ApiCollection';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

const Churches = () => {
  const queryClient = useQueryClient();
  interface Church {
    id: number;
    nombre: string;
    departamento: string;
    area: string;
    localidad: string;
    direccion: string;
  }
  
  const [editChurch, setEditChurch] = useState<Church | null>(null);
  const [churchToDelete, setChurchToDelete] = useState<Church | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChurchData, setNewChurchData] = useState({
    nombre: '',
    departamento: 'La Paz',
    area: 'URBANO',
    localidad: '',
    direccion: ''
  });

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allchurches'],
    queryFn: fetchChurches,
  });

  const createMutation = useMutation({
    mutationFn: createChurch,
    onSuccess: () => {
      toast.success('Church created successfully!');
      queryClient.invalidateQueries({ queryKey: ['allchurches'] });
      setIsAddModalOpen(false);
      setNewChurchData({
        nombre: '',
        departamento: 'La Paz',
        area: 'URBANO',
        localidad: '',
        direccion: ''
      });
    },
    onError: () => {
      toast.error('Error creating church!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteChurch,
    onSuccess: () => {
      toast.success('Church deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['allchurches'] });
      setChurchToDelete(null);
    },
    onError: () => {
      toast.error('Error deleting church!');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateChurch,
    onSuccess: () => {
      toast.success('Church updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['allchurches'] });
      setEditChurch(null);
    },
    onError: () => {
      toast.error('Error updating church!');
    },
  });

  const handleDelete = (church: Church) => {
    setChurchToDelete(church);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (church: Church) => {
    setEditChurch(church);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedChurch: Church) => {
    updateMutation.mutate({ ...updatedChurch, id: updatedChurch.id.toString() });
  };

  const handleConfirmDelete = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  const handleAdd = () => {
    createMutation.mutate(newChurchData);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 20, flex: 1 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'departamento',
      headerName: 'Departamento',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'area',
      headerName: 'Área',
      minWidth: 50,
      flex: 1,
    },
    {
      field: 'localidad',
      headerName: 'Localidad',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 90,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(params.row)}>
              <HiOutlinePencilSquare />
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.row)}>
              <HiOutlineTrash />
            </button>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseChurches' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseChurches',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseChurches',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Iglesias
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Iglesias Encontradas
              </span>
            )}
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
          >
            Add New Church +
          </button>
        </div>
        <div className="w-full overflow-auto">
          {isLoading ? (
            <DataTable
              slug="churches"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
          ) : isSuccess ? (
            <DataTable
              slug="churches"
              columns={columns}
              rows={data}
              includeActionColumn={false}
            />
          ) : (
            <>
              <DataTable
                slug="churches"
                columns={columns}
                rows={[]}
                includeActionColumn={false}
              />
              <div className="w-full flex justify-center">
                Error while getting the data!
              </div>
            </>
          )}
        </div>

        {isEditModalOpen && editChurch && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Editar Iglesia</h2>
              <label>Nombre</label>
              <input
                type="text"
                value={editChurch.nombre}
                onChange={(e) => setEditChurch({ ...editChurch, nombre: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label>Departamento</label>
              <select
                value={editChurch.departamento}
                onChange={(e) => setEditChurch({ ...editChurch, departamento: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="Chuquisaca">Chuquisaca</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Oruro">Oruro</option>
                <option value="Potosi">Potosi</option>
                <option value="Tarija">Tarija</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Beni">Beni</option>
                <option value="Pando">Pando</option>
              </select>
              <label>Área</label>
              <select
                value={editChurch.area}
                onChange={(e) => setEditChurch({ ...editChurch, area: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="URBANO">URBANO</option>
                <option value="RURAL">RURAL</option>
              </select>
              <label>Localidad</label>
              <input
                type="text"
                value={editChurch.localidad}
                onChange={(e) => setEditChurch({ ...editChurch, localidad: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label>Dirección</label>
              <input
                type="text"
                value={editChurch.direccion}
                onChange={(e) => setEditChurch({ ...editChurch, direccion: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={() => handleUpdate(editChurch)}>
                  Guardar
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && churchToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Eliminar Iglesia</h2>
              <p>¿Estás seguro de eliminar la iglesia "{churchToDelete.nombre}"?</p>
              <div className="flex justify-end mt-4">
                <button className="btn btn-danger" onClick={() => handleConfirmDelete(churchToDelete.id)}>
                  Eliminar
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Añadir Nueva Iglesia</h2>
              <label>Nombre</label>
              <input
                type="text"
                value={newChurchData.nombre}
                onChange={(e) => setNewChurchData({ ...newChurchData, nombre: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label>Departamento</label>
              <select
                value={newChurchData.departamento}
                onChange={(e) => setNewChurchData({ ...newChurchData, departamento: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="Chuquisaca">Chuquisaca</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Oruro">Oruro</option>
                <option value="Potosi">Potosi</option>
                <option value="Tarija">Tarija</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Beni">Beni</option>
                <option value="Pando">Pando</option>
              </select>
              <label>Área</label>
              <select
                value={newChurchData.area}
                onChange={(e) => setNewChurchData({ ...newChurchData, area: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="URBANO">URBANO</option>
                <option value="RURAL">RURAL</option>
              </select>
              <label>Localidad</label>
              <input
                type="text"
                value={newChurchData.localidad}
                onChange={(e) => setNewChurchData({ ...newChurchData, localidad: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label>Dirección</label>
              <input
                type="text"
                value={newChurchData.direccion}
                onChange={(e) => setNewChurchData({ ...newChurchData, direccion: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Añadir
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Churches;