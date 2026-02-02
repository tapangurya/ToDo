/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { UserContext } from './UserProvider';
import '../../CSS/UserForm.css';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .trim()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  gender: Yup.string().trim().required('Please select a gender'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Min 6 characters')
    .matches(/[A-Z]/, 'Need at least one uppercase letter')
    .matches(/[a-z]/, 'Need at least one lowercase letter')
    .matches(/[0-9]/, 'Need at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Need at least one special character'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'), // The magic line
});

const UserForm = () => {
  const { addUser } = useContext(UserContext);

  // States for toggling visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        // Typically you don't send confirmPassword to the API
        const { confirmPassword, ...submitData } = values;
        await addUser(submitData);
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Reusable Eye Icon Component for neatness
  const ToggleIcon = ({ visible, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#666',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <motion.div
      className="registration-card"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Join our community by filling out the form below.</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="modern-form"
      >
        {/* Name */}
        <motion.div
          variants={itemVariants}
          className={`form-group ${formik.touched.name && formik.errors.name ? 'has-error' : ''}`}
        >
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="error-text">{formik.errors.name}</span>
          )}
        </motion.div>

        {/* Email & Phone */}
        <div className="form-row">
          <motion.div
            variants={itemVariants}
            className={`form-group ${formik.touched.email && formik.errors.email ? 'has-error' : ''}`}
          >
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error-text">{formik.errors.email}</span>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`form-group ${formik.touched.phone && formik.errors.phone ? 'has-error' : ''}`}
          >
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="1234567890"
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="error-text">{formik.errors.phone}</span>
            )}
          </motion.div>
        </div>

        {/* Gender */}
        <motion.div
          variants={itemVariants}
          className={`form-group ${formik.touched.gender && formik.errors.gender ? 'has-error' : ''}`}
        >
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...formik.getFieldProps('gender')}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <span className="error-text">{formik.errors.gender}</span>
          )}
        </motion.div>

        {/* Password Fields Row */}
        <div className="form-row">
          {/* Password */}
          <motion.div
            variants={itemVariants}
            className={`form-group ${formik.touched.password && formik.errors.password ? 'has-error' : ''}`}
          >
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ paddingRight: '40px' }}
                {...formik.getFieldProps('password')}
              />
              <ToggleIcon
                visible={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="error-text">{formik.errors.password}</span>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            variants={itemVariants}
            className={`form-group ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'has-error' : ''}`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ paddingRight: '40px' }}
                {...formik.getFieldProps('confirmPassword')}
              />
              <ToggleIcon
                visible={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="error-text">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="action-area">
          <button
            type="submit"
            className="btn-primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Processing...' : 'Register Account'}
          </button>
          <button
            type="reset"
            className="btn-ghost"
            onClick={formik.handleReset}
          >
            Reset Fields
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UserForm;
