import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import UserForm from './Components/UserForm';
import { UserProvider } from './Components/UserProvider';
import Home from './Components/Home';
import UserList from './Components/UserList';
import Layout from './Components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Show Home only on `/`
      { path: 'userform', element: <UserForm /> },
      { path: 'userslist', element: <UserList /> },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
