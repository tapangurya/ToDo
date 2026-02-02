const TodoData = require('../Model/todo');
const AppError = require('../Error/AppError');
const catchAsync = require('../Utils/catchAsync');
exports.getTodoList = catchAsync(async (req, res, next) => {
  const todoList = await TodoData.find();
  if (!todoList || todoList.length === 0) {
    res.status(200).json({
      success: true,
      message: 'Your todo list is empty',
      data: [],
    });
  }
  res.status(200).json({
    success: true,
    message: 'Todo fetched successfully',
    data: todoList,
  });
});
exports.addTodo = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const newTodo = await TodoData.create({ title, description });
  res.status(201).json({
    success: true,
    message: 'Todo added successfully',
    data: newTodo,
  });
});
exports.editTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedTodo = await TodoData.findByIdAndUpdate(
    id,
    { title, description },
    { new: true },
  );
  if (!updatedTodo) {
    res.status(404).json({
      success: false,
      message: 'Todo not found',
      data: null,
    });
  }
  res.status(200).json({
    success: true,
    message: 'Todo updated successfully',
    data: updatedTodo,
  });
});

exports.toggleTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the todo first
  const todo = await TodoData.findById(id);
  if (!todo) {
    res.status(404).json({
      success: false,
      message: 'Todo not found',
      data: null,
    });
  }

  // Toggle isCompleted
  todo.isCompleted = !todo.isCompleted;
  

  // Save changes
  const updatedTodo = await todo.save();

  res.status(200).json({
    success: true,
    message: `Todo ${updatedTodo.isCompleted ? 'marked as done' : 'marked as undone'} successfully`,
    data: updatedTodo,
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo = await TodoData.findByIdAndDelete(id);
  if (!deletedTodo) {
    res.status(404).json({
      success: false,
      message: 'Todo not found',
      data: null,
    });
  }
  res.status(200).json({
    success: true,
    message: 'Todo deleted successfully',
    data: null,
  });
});
