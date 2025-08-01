import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// GET /api/users
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

// POST /api/users
export const createUser = async (user) => {
  const res = await axios.post(`${API_URL}/users`, user);
  return res.data;
};

// DELETE /api/users/{id}
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
