/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { UserContext } from './UserProvider';
import '../../CSS/UserList.css';
import Swal from 'sweetalert2';
import Spinner from './Spinner';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

const UserList = () => {
  const { users, isLoading, deleteUser, updateUser } = useContext(UserContext);

  if (isLoading) return <Spinner />;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${user.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user._id);
        Swal.fire('Deleted!', 'User has been removed.', 'success');
      }
    });
  };

  const handleEdit = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit User Profile',
      html: `
          <div class="swal-form">
            <label>Full Name</label>
            <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
            <label>Email Address</label>
            <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
            <label>Phone Number</label>
            <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${user.phone}">
            <label>Gender</label>
            <select id="swal-gender" class="swal2-input">
              <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
              <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
              <option value="other" ${user.gender === 'other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      preConfirm: () => ({
        _id: user._id,
        name: document.getElementById('swal-name').value,
        email: document.getElementById('swal-email').value,
        phone: document.getElementById('swal-phone').value,
        gender: document.getElementById('swal-gender').value,
      }),
    });

    if (formValues) {
      Swal.fire({ title: 'Processing...', didOpen: () => Swal.showLoading() });
      try {
        await updateUser(formValues);
        Swal.fire('Success', 'User profile updated', 'success');
      } catch (error) {
        Swal.fire('Error', 'Update failed', 'error');
      }
    }
  };

  return (
    <motion.div 
      className="user-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-section">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          User Management
        </motion.h2>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Manage your team members and their account details.
        </motion.p>
      </div>

      {!users?.data || users.data.length === 0 ? (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          No users found in the database.
        </motion.div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode='popLayout'>
                {users.data.map((user) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    layout // Smoothly slides rows when one is deleted
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", transition: { duration: 0.1 } }}
                  >
                    <td className="font-bold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`badge ${user.gender}`}>
                        {user.gender}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-delete"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default UserList;