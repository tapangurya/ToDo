const express = require('express');
const router = express.Router();
const todoController = require('../Controller/controller_');
const AppError = require('../Error/AppError'); // make sure you have a custom AppError class

// --- Routes ---
//Get Todo List
router.get('/todos', todoController.getTodoList);
// Add Todo
router.post('/todos/create', todoController.addTodo);

// Mark Done
// PATCH /todos/:id/toggle
router.patch('/todos/:id/toggle', todoController.toggleTodo);

//Edit Todo
router.patch('/todos/edit/:id', todoController.editTodo);
// Delete Todo
router.delete('/todos/:id', todoController.deleteTodo);
// --- 404 handler ---
// This should be **after all routes**
router.use((req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error); // passes to centralized error handler
});

module.exports = router;
