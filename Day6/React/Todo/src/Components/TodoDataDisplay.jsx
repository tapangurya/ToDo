import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from './Spinner';
import '../CSS/TodoDataDisplay.css';

const MySwal = withReactContent(Swal);

const TodoDataDisplay = ({
  todos,
  deleteTodo,
  editingTodo,
  toggleTodo,
  loading,
}) => {
  if (loading) return <Spinner />;

  if (!todos.length) {
    return <h3 className="empty-message">Your todo list is empty</h3>;
  }

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) deleteTodo(id);
    });
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">My Tasks</h2>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
        >
          <div className="todo-header">
            <h3
              className={`todo-heading ${todo.isCompleted ? 'completed-text' : ''}`}
            >
              {todo.title}
            </h3>

            <div className="todo-buttons">
              <button
                className={`btn toggle-btn ${todo.isCompleted ? 'undo' : 'done'}`}
                onClick={() => toggleTodo(todo)}
              >
                {todo.isCompleted ? 'Undo' : 'Done'}
              </button>

              <button
                className="btn edit-btn"
                onClick={() => editingTodo(todo)}
              >
                Edit
              </button>

              <button
                className="btn delete-btn"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>

          <p className="todo-description">{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoDataDisplay;
