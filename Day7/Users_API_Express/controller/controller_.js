const UserData = require('../model/userdata');
const AppError = require('../Error/AppError');
const catchAsync = require('../Utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await UserData.find();
  if (!users || users.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'No users found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, phone, email, gender, password, isActive } = req.body;

  if (!name || !phone || !email || !password) {
    throw new AppError('All required fields must be provided', 400);
  }

  const existUser = await UserData.findOne({ email });
  if (existUser) {
    throw new AppError('Email already exists', 409);
  }

  const user = new UserData({
    name,
    phone,
    email,
    password,
    gender: gender || undefined,
    isActive: isActive || false,
  });
  await user.save();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
  });
});

exports.findUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.query;
  if (!email) {
    throw new AppError('Email is required', 400);
  }

  const user = await UserData.findOne({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

exports.userDeleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId; // URL param

  if (!userId) {
    throw new AppError('User ID is required', 400);
  }

  const result = await UserData.deleteOne({ _id: userId });

  if (result.deletedCount === 0) {
    throw new AppError('User does not exist', 404);
  }

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    throw new AppError('Id is required', 400);
  }

  const { name, phone, email, password, gender } = req.body;
  const existUser = await UserData.findOne({
    email,
    _id: {
      $ne: userId,
    },
  });
  if (existUser) {
    throw new AppError('Email already exists', 409);
  }
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (phone !== undefined) updateFields.phone = phone;
  if (email !== undefined) updateFields.email = email;
  if (password !== undefined) updateFields.password = password;
  if (gender !== undefined) updateFields.gender = gender;

  const updatedUser = await UserData.findOneAndUpdate(
    { _id: userId },
    { $set: updateFields },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError('User not exist', 404);
  }

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});
