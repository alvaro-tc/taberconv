import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchEvents, deleteEvent } from '../api/ApiCollection';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddEvent from '../components/AddEvent';
import EditEvent from '../components/EditEvent';
import DeleteEvent from '../components/DeleteEvent';
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const queryClient = useQueryClient();
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allevents'],
    queryFn: fetchEvents,
  });
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allevents'] });
      toast.success('Event deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete event');
    },
  });

  const handleDelete = (id: string) => {
    setSelectedEventId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedEventId(id);
    setIsEditOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEventId) {
      mutation.mutate(selectedEventId);
      setIsDeleteOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'descripcion',
      headerName: 'Descripcion',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        if (params.row.estado === 0) {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="text-sm font-medium text-success">
                Activo
              </div>
            </div>
          );
        } else if (params.row.estado === 1) {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="text-sm font-medium text-warning">
                Pendiente
              </div>
            </div>
          );
        } else if (params.row.estado === 2) {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <div className="text-sm font-medium text-error">
                Terminado
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-2">
              <div className="badge bg-neutral-content badge-xs"></div>
              <span className="text-sm font-semibold text-neutral-content">
                Unknown
              </span>
            </div>
          );
        }
      },
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      minWidth: 100,
      type: 'string',
      flex: 1,
      renderCell: (params) => {
        return (
          <span>
            {new Date(params.row.fecha).toLocaleDateString()}
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
                navigate(`/events/${params.row.id}`);
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
      toast.loading('Loading...', { id: 'promiseEvents' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseEvents',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseEvents',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Eventos
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} eventos encontrados
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
          >
            Añadir nuevo +
          </button>
        </div>
        {isLoading ? (
          <DataTable
            slug="events"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="events"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="events"
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
          <AddEvent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        {isEditOpen && selectedEventId && (
          <EditEvent
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            eventId={selectedEventId}
          />
        )}

        {isDeleteOpen && selectedEventId && (
          <DeleteEvent
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onDelete={confirmDelete}
        />
        )}
      </div>
    </div>
  );
};

export default Events;