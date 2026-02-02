import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// FETCH USERS //
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// CREATE USER //
export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/user-create`, user);
  console.log('Create user log: ', response.data);

  return response.data;
};
//DELETE USERS//
export const deleteUser = async (id) => {
  if (!id) throw new Error('User ID is required');
  const response = await axios.delete(`${API_URL}/user-delete/${id}`);
  // console.log('Data deleted status : ', response.data);

  return response.data;
};

// UPDATE USER //
export const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/user-update/${user._id}`, {
    name: user.name,
    phone: user.phone,
    email: user.email,
    gender: user.gender,
  });

  return response.data;
};
//Router Backend
//router.put('/users/user-update/:userId', cont.updateUser);
