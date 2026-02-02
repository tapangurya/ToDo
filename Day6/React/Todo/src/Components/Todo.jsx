import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  fetchTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from '../Api/TodoApi';
import TodoFormUsingFormik from './TodoFormUsingFormik';
import TodoDataDisplay from './TodoDataDisplay';
import Spinner from './Spinner';
import ErrorPage from '../ErrorPage';

const Todo = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const queryClient = useQueryClient();

  // FETCH TODOS
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // CREATE TODO
  const createMutation = useMutation({
    mutationFn: createTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo added');
    },
  });

  // DELETE TODO
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted');
    },
    onError: () => {
      toast.error('Failed to delete todo');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: (res) => {
      // res = { success, message, data }
      const updatedTodo = res.data; //

      queryClient.invalidateQueries({ queryKey: ['todos'] });

      // Show toast based on isCompleted
      toast(
        updatedTodo.isCompleted
          ? 'Todo marked as Done'
          : 'Todo marked as Undone',
        {
          style: {
            backgroundColor: updatedTodo.isCompleted ? '#15b930' : '#b91a1a',
            color: 'white',
          },
        },
      );
    },
    onError: () => {
      toast.error('Failed to toggle todo ');
    },
  });

  // EDIT TODO
  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updateed');
    },
    onError: () => {
      toast.error('Failed to edit todo');
    },
  });

  const isMutating =
    createMutation.isPending ||
    deleteMutation.isPending ||
    toggleMutation.isPending ||
    editMutation.isPending;

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load todos"
        message="Please check your connection or try again in a moment."
        onRetry={refetch} // if you’re using React Query
      />
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Todo Application</h1>

      <TodoFormUsingFormik
        addTodo={(todo) => createMutation.mutate(todo)}
        editTodo={(todo) => editMutation.mutate(todo)}
        editingTodo={editingTodo}
        clearEditing={() => setEditingTodo(null)}
      />

      <TodoDataDisplay
        todos={data?.data ?? []}
        loading={isFetching || isMutating} // optional
        deleteTodo={(id) => deleteMutation.mutate(id)}
        toggleTodo={(todo) => toggleMutation.mutate(todo)}
        editingTodo={setEditingTodo}
      />
    </div>
  );
};

export default Todo;
