const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Mobile number must be 10 digits'],
      maxlength: [10, 'Mobile number cannot exceed 10 digits'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model('UserData', userSchema);

module.exports = User;
// name, phone ,email,gender,password,isActive
