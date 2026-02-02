import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim(), description.trim());
    setTitle('');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
      >
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <input
          type="textarea"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
          Add Todo
        </button>
      </form>
    </>
  );
};

export default TodoForm;
