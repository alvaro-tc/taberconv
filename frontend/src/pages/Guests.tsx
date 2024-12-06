import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchGuests, deleteGuest } from '../api/ApiCollection';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import EditData from '../components/EditData';
import DeleteData from '../components/DeleteData';
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Guests = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedGuestId, setSelectedGuestId] = React.useState<string | null>(null);
  const queryClient = useQueryClient();
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allguests'],
    queryFn: fetchGuests,
  });
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allguests'] });
      toast.success('Guest deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete guest');
    },
  });

  const handleDelete = (id: string) => {
    setSelectedGuestId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedGuestId(id);
    setIsEditOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGuestId) {
      mutation.mutate(selectedGuestId);
      setIsDeleteOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-9 rounded-full">
                <img
                  src={params.row.img || '/Portrait_Placeholder.png'}
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none">
              {params.row.nombre} 
            </span>
          </div>
        );
      },
    },
    {
      field: 'apellidos',
      type: 'string',
      headerName: 'Apellidos',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'telefono',
      type: 'string',
      headerName: 'Telefono',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'church_name',
      type: 'string',
      headerName: 'Iglesia',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha Registro',
      minWidth: 100,
      type: 'string',
      flex: 1,
      renderCell: (params) => {
        return (
          <span>
            {new Date(params.row.fecha_registro).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <button
              onClick={() => {
                navigate(`/guests/${params.row.id}`);
              }}
              className="btn btn-square btn-ghost"
            >
              <HiOutlineEye />
            </button>
            <button
              onClick={() => handleEdit(params.row.id)}
              className="btn btn-square btn-ghost"
            >
              <HiOutlinePencilSquare />
            </button>
            <button
              onClick={() => handleDelete(params.row.id)}
              className="btn btn-square btn-ghost"
            >
              <HiOutlineTrash />
            </button>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseUsers' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseUsers',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseUsers',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Invitados
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} invitados Encontrados
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Añadir nuevo +
          </button>
        </div>
        {isLoading ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="users"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddData
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            slug={''}
          />
        )}

        {isEditOpen && selectedGuestId && (
          <EditData
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            slug={''}
            guestId={selectedGuestId}
          />
        )}

        {isDeleteOpen && (
          <DeleteData
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            onDelete={confirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Guests;