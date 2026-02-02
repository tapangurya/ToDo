const express = require('express');
const router = express.Router();
const cont = require('../controller/controller_');
const AppError = require('../Error/AppError'); // make sure you have a custom AppError class

// --- Routes ---
// get all users
router.get('/users', cont.getUsers);
// create a user
router.post('/users/user-create', cont.createUser);
// get user by email
router.get('/users/user-find', cont.findUserByEmail);
// delete a user
router.delete('/users/user-delete/:userId', cont.userDeleteUser);
// update a user
router.put('/users/user-update/:userId', cont.updateUser);

// --- 404 handler ---
// This should be **after all routes**
router.use((req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error); // passes to centralized error handler
});

module.exports = router;
