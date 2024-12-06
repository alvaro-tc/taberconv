import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClipboardDocumentList,
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartBar,
  HiOutlineDocumentText,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBriefcase,
  HiOutlineQrCode,
} from 'react-icons/hi2';

import { logoutUser } from '../../api/ApiCollection';

const createLogoutHandler = (navigate: any) => async () => {
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      const data = await logoutUser();
      console.log('API response:', data);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
};

export const menu = (navigate: any) => {
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');

  const menuItems = [
    {
      catalog: 'main',
      listItems: [
        {
          isLink: true,
          url: '/',
          icon: HiOutlineHome,
          label: 'homepage',
        },
        {
          isLink: true,
          url: '/profile',
          icon: HiOutlineUser,
          label: 'profile',
        },
      ],
    },
    {
      catalog: 'lists',
      listItems: [
        {
          isLink: true,
          url: '/guests',
          icon: HiOutlineUsers,
          label: 'Invitados',
        },
        {
          isLink: true,
          url: '/positions',
          icon: HiOutlineBriefcase,
          label: 'Cargos',
        },
        {
          isLink: true,
          url: '/churches',
          icon: HiOutlineCube,
          label: 'Iglesias',
        },
        {
          isLink: true,
          url: '/events',
          icon: HiOutlineCalendarDays,
          label: 'Eventos',
        },
        {
          isLink: true,
          url: '/scanner',
          icon: HiOutlineQrCode,
          label: 'Escaner QR',
        },
        ...(userRoles.includes('admin') ? [{
          isLink: true,
          url: '/users',
          icon: HiOutlineUsers,
          label: 'users',
        }] : []),
        {
          isLink: true,
          url: '/products',
          icon: HiOutlineCube,
          label: 'products',
        },
        {
          isLink: true,
          url: '/orders',
          icon: HiOutlineClipboardDocumentList,
          label: 'orders',
        },
      ],
    },
    {
      catalog: 'general',
      listItems: [
        {
          isLink: true,
          url: '/notes',
          icon: HiOutlinePencilSquare,
          label: 'notes',
        },
        {
          isLink: true,
          url: '/calendar',
          icon: HiOutlineCalendarDays,
          label: 'calendar',
        },
      ],
    },
    {
      catalog: 'analytics',
      listItems: [
        {
          isLink: true,
          url: '/charts',
          icon: HiOutlinePresentationChartBar,
          label: 'charts',
        },
        {
          isLink: true,
          url: '/logs',
          icon: HiOutlineDocumentText,
          label: 'logs',
        },
      ],
    },
    {
      catalog: 'miscellaneous',
      listItems: [
        {
          isLink: false,
          icon: HiOutlineArrowLeftOnRectangle,
          label: 'log out',
          onClick: createLogoutHandler(navigate),
        },
      ],
    },
  ];

  return menuItems;
};