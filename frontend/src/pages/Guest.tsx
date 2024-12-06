import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleGuest } from '../api/ApiCollection';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Guest = () => {
  const tempEntries: number[] = [1, 2, 3, 4, 5];
  const dataLine = [
    {
      name: 'Jan',
      purchased: 4000,
      wishlisted: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      purchased: 3000,
      wishlisted: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      purchased: 2000,
      wishlisted: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      purchased: 2780,
      wishlisted: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      purchased: 1890,
      wishlisted: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      purchased: 2390,
      wishlisted: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      purchased: 3490,
      wishlisted: 4300,
      amt: 2100,
    },
  ];

  const { id } = useParams();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['guest', id],
    queryFn: () => fetchSingleGuest(id || ''),
  });

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseRead' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseRead',
      });
    }
    if (isSuccess) {
      toast.success('Read the data successfully!', {
        id: 'promiseRead',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div id="singleGuest" className="w-full p-0 m-0">
      <div className="w-full grid xl:grid-cols-2 gap-10 mt-5 xl:mt-0">
        <div className="w-full flex flex-col items-start gap-10">
          <div className="w-full flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
                <div className="avatar">
                  {isLoading ? (
                    <div className="w-24 xl:w-36 h-24 xl:h-36 rounded-full skeleton dark:bg-neutral"></div>
                  ) : isSuccess ? (
                    <div className="w-24 xl:w-36 rounded-full">
                      <img src={data.img || '/Portrait_Placeholder.png'} alt="avatar" />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex flex-col items-start gap-1">
                  {isLoading ? (
                    <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                  ) : isSuccess ? (
                    <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                      {data.nombre} {data.apellidos}
                    </h3>
                  ) : (
                    <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                  )}
                  <span className="font-normal text-base">
                    Invitado
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-8">
              {isLoading ? (
                <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
              ) : isSuccess ? (
                <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
                  <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                    <span>Nombre</span>
                    <span>Apellidos</span>
                    <span>Correo</span>
                    <span>Telefono</span>
                    <span>Posicion</span>
                    <span>Iglesia</span>
                    <span>Fecha de Registro</span>
                  </div>
                  <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                    <span className="font-semibold">
                      {data.nombre}
                    </span>
                    <span className="font-semibold">
                      {data.apellidos}
                    </span>
                    <span className="font-semibold">
                      {data.email}
                    </span>
                    <span className="font-semibold">
                      {data.telefono}
                    </span>
                    <span className="font-semibold">
                      {data.position_description}
                    </span>
                    <span className="font-semibold">
                      {data.church_name}
                    </span>
                    <span className="font-semibold">
                      {new Date(data.fecha_registro).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
              )}
            </div>
          </div>
          <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700"></div>
          {isLoading ? (
            <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
          ) : isSuccess ? (
            <div className="w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataLine}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="purchased"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="wishlisted"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
          )}
        </div>
        <div
          id="activities"
          className="w-full flex flex-col items-start gap-5"
        >
          <h2 className="text-2xl font-semibold dark:text-white">
            Ultima Actividad
          </h2>
          {isLoading &&
            tempEntries.map((index: number) => (
              <div
                className="w-full h-20 skeleton dark:bg-neutral"
                key={index}
              ></div>
            ))}
          {isSuccess && (
            <ul>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>
                    {data.nombre} {data.apellidos} se registró el día  {new Date(data.fecha_registro).toLocaleDateString()}
                  </span>
                  <span className="text-xs"> ({formatDistanceToNow(parseISO(data.fecha_registro))} ago)</span>
                </div>
              </li>
            </ul>
          )}
          {isError &&
            tempEntries.map((index: number) => (
              <div
                className="w-full h-20 skeleton dark:bg-neutral"
                key={index}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Guest;