import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = 'http://localhost:3000/todos';

/* -------- FETCH TODOS -------- */
export const fetchTodos = async () => {
  console.log('Url is ', API_URL);
  const res = await axios.get(API_URL);
  return res.data; // must be array
};

/* -------- CREATE TODO -------- */
export const createTodo = async (todo) => {
  const res = await axios.post(`${API_URL}/create`, todo, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

/* -------- DELETE TODO -------- */
export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

/* -------- TOGGLE TODO -------- */
export const toggleTodo = async (todo) => {
  const res = await axios.patch(`${API_URL}/${todo._id}/toggle`, {
    isCompleted: !todo.isCompleted,
  });
  return res.data;
};

/* -------- EDIT TODO -------- */
export const editTodo = async (todo) => {
  const res = await axios.patch(`${API_URL}/edit/${todo._id}`, {
    title: todo.title,
    description: todo.description,
  });
  return res.data;
};
