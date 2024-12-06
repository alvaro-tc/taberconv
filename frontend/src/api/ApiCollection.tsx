import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// GET TOP DEALS
export const fetchTopDeals = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/topdeals')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL USERS
export const fetchTotalUsers = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalusers')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL PRODUCTS
export const fetchTotalProducts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalproducts')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL RATIO
export const fetchTotalRatio = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalratio')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL REVENUE
export const fetchTotalRevenue = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalrevenue')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL SOURCE
export const fetchTotalSource = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalsource')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL VISIT
export const fetchTotalVisit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalvisit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL REVENUE BY PRODUCTS
export const fetchTotalRevenueByProducts = async () => {
  const response = await axios
    .get(
      'https://react-admin-ui-v1-api.vercel.app/totalrevenue-by-product'
    )
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL PROFIT
export const fetchTotalProfit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalprofit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL USERS
export const fetchUsers = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/users')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL PRODUCTS
export const fetchProducts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/products')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE PRODUCT
export const fetchSingleProduct = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/products/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL ORDERS
export const fetchOrders = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/orders')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};



// GET ALL POSITIONS (CARGOS)
export const fetchPositions = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get('http://localhost:5000/api/positions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// UPDATE POSITION
export const updatePosition = async ({ id, descripcion }: { id: any; descripcion: string }) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .put(`http://localhost:5000/api/positions/${id}`, { descripcion }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// DELETE POSITION
export const deletePosition = async (id: string) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .delete(`http://localhost:5000/api/positions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios delete:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(token);
      console.log(err);
      throw err;
    });

  return response;
};


// CREATE NEW POSITION
export const createPosition = async (descripcion: string) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .post('http://localhost:5000/api/positions', { descripcion }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios post:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};



// GET ALL CHURCHES
export const fetchChurches = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get('http://localhost:5000/api/churches', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// CREATE NEW CHURCH
interface ChurchData {
  nombre: string;
  departamento: string;
  area: string;
  localidad: string;
  direccion: string;
  // add other properties as needed
}

export const createChurch = async (churchData: ChurchData) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .post('http://localhost:5000/api/churches', churchData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      
      console.log('axios post:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(churchData);
      console.log(err);
      throw err;
    });

  return response;
};

// UPDATE CHURCH
export const updateChurch = async ({ id, ...churchData }: { id: string; [key: string]: any }) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .put(`http://localhost:5000/api/churches/${id}`, churchData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// DELETE CHURCH
export const deleteChurch = async (id: string) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .delete(`http://localhost:5000/api/churches/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios delete:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE GUEST
export const fetchSingleGuest = async (id: string) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get(`http://localhost:5000/api/guests/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL GUESTS
export const fetchGuests = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get('http://localhost:5000/api/guests', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};


export const deleteGuest = async (id: string): Promise<void> => {
  const token = localStorage.getItem('authToken');
  await axios
    .delete(`http://localhost:5000/api/guests/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios delete:', res.data);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchGuestById = async (id: string) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get(`http://localhost:5000/api/guests/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const updateGuest = async (id: string, guestData: any) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .put(`http://localhost:5000/api/guests/${id}`, guestData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(guestData);
      console.log(err);
      throw err;
    });

  return response;
};



// GET CHURCH BY ID
export const fetchChurchById = async (id: number) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get(`http://localhost:5000/api/churches/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET POSITION BY ID
export const fetchPositionById = async (id: number) => {
  const token = localStorage.getItem('authToken');
  const response = await axios
    .get(`http://localhost:5000/api/positions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};








export const createGuest = async (guestData: {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  position_id: number;
  church_id: number;
}) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .post('http://localhost:5000/api/guests', guestData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios post:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(guestData);
      console.log(err);
      throw err;
    });

  return response;
};



export const fetchEventById = async (id: string) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .get(`http://localhost:5000/api/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const fetchEvents = async () => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .get(`http://localhost:5000/api/events`
      , {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const addEvent = async (eventData: {
  descripcion: string;
  estado: number;
  fecha: string;
}) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .post(`http://localhost:5000/api/events`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios post:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(eventData);
      console.log(err);
      throw err;
    });

  return response;
};

export const updateEvent = async (eventData: {
  id: string;
  descripcion: string;
  estado: number;
  fecha: string;
}) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .put(`http://localhost:5000/api/events/${eventData.id}`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(eventData);
      console.log(err);
      throw err;
    });

  return response;
};

export const deleteEvent = async (id: string) => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .delete(`http://localhost:5000/api/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('axios delete:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};





export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .get(`http://localhost:5000/api/whoami`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};









export const logoutUser = async () => {
  const token = localStorage.getItem('authToken');

  const response = await axios
    .get(`http://localhost:5000/api/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  // Remover el token y los roles del Local Storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRoles');

  return response;
};



export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`http://localhost:5000/api/refresh`, {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
    },
  });

  if (response.status === 200) {
    const newAccessToken = response.data.access_token;
    localStorage.setItem('authToken', newAccessToken);
  }

  return response.data;
};




export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`http://localhost:5000/api/login`, {
    email,
    password,
  });

  if (response.status === 200) {
    const data = response.data;
    const accessToken = data.tokens.access;
    const refreshToken = data.tokens.refresh;

    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    //console.log('JWT Token:', accessToken);
    //console.log('Refresh Token:', refreshToken);
  }

  return response.data;
};



// GET ALL NOTES
export const fetchNotes = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/notes?q=`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL LOGS
export const fetchLogs = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/logs`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};
