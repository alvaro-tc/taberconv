import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchPositions, createPosition, updatePosition, deletePosition } from '../api/ApiCollection';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

const Positions = () => {
  const queryClient = useQueryClient();
  interface Position {
    id: number;
    descripcion: string;
  }
  
  const [editPosition, setEditPosition] = useState<Position | null>(null);
  const [positionToDelete, setPositionToDelete] = useState<Position | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDescripcion, setNewDescripcion] = useState('');

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allpositions'],
    queryFn: fetchPositions,
  });

  const createMutation = useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      toast.success('Position created successfully!');
      queryClient.invalidateQueries({ queryKey: ['allpositions'] });
      setIsAddModalOpen(false);
      setNewDescripcion('');
    },
    onError: () => {
      toast.error('Error creating position!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePosition,
    onSuccess: () => {
      toast.success('Position deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['allpositions'] });
      setPositionToDelete(null);
    },
    onError: () => {
      toast.error('Una persona tiene este cargo!!');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePosition,
    onSuccess: () => {
      toast.success('Position updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['allpositions'] });
      setEditPosition(null);
    },
    onError: () => {
      toast.error('Error actualizando posicion!');
    },
  });

  const handleDelete = (position: Position) => {
    setPositionToDelete(position);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (position: Position) => {
    setEditPosition(position);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedPosition: Position) => {
    updateMutation.mutate(updatedPosition);
  };

  const handleConfirmDelete = (id: number) => {
      deleteMutation.mutate(id.toString());
  };

  const handleAdd = () => {
    createMutation.mutate(newDescripcion);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 20 },
    {
      field: 'descripcion',
      headerName: 'Cargo',
      minWidth: 100,
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
      toast.loading('Loading...', { id: 'promisePositions' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promisePositions',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promisePositions',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Cargos
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Cargos Encontrados
              </span>
            )}
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
          >
            Add New Cargo +
          </button>
        </div>
        {isLoading ? (
          <DataTable
            slug="positions"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="positions"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="positions"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isEditModalOpen && editPosition && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Editar Cargo</h2>
              <input
                type="text"
                value={editPosition.descripcion}
                onChange={(e) => setEditPosition({ ...editPosition, descripcion: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={() => handleUpdate(editPosition)}>
                  Guardar
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && positionToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Eliminar Cargo</h2>
              <p>¿Estás seguro de eliminar el cargo "{positionToDelete.descripcion}"?</p>
              <div className="flex justify-end mt-4">
                <button className="btn btn-danger" onClick={() => handleConfirmDelete(positionToDelete.id)}>
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
              <h2 className="text-xl font-bold mb-4">Añadir Nuevo Cargo</h2>
              <input
                type="text"
                value={newDescripcion}
                onChange={(e) => setNewDescripcion(e.target.value)}
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

export default Positions;