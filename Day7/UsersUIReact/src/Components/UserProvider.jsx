import React, { createContext, useState } from 'react';
import {
  fetchUsers,
  createUser,
  deleteUser,
  updateUser,
} from '../../Api/BackendConnectiobn';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [editingUser, setEditingUser] = useState(null);
  const queryClient = useQueryClient();

  // 🔹 Fetch Users
  const {
    data: users,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // 🔹 Create User
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User created successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to create user',
      );
    },
  });

  // 🔹 Delete User
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to delete user',
      );
    },
  });

  // 🔹 Update User
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to update user',
      );
    },
  });

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        isError,
        isFetching,
        refetchUsers: refetch,

        editingUser,
        setEditingUser,

        addUser: (user) => createMutation.mutateAsync(user),
        deleteUser: (id) => deleteMutation.mutate(id),
        updateUser: (user) => updateMutation.mutateAsync(user),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
