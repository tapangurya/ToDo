import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../CSS/Form.css';

const validationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required'),
  description: Yup.string().trim().required('Description is required'),
});

const TodoFormUsingFormik = ({
  addTodo,
  editTodo,
  editingTodo,
  clearEditing,
}) => {
  const formik = useFormik({
    initialValues: {
      title: editingTodo?.title || '',
      description: editingTodo?.description || '',
      _id: editingTodo?._id || undefined, // use this to detect edit mode
      isCompleted: editingTodo?.isCompleted || false,
    },
    enableReinitialize: true, // update form when editingTodo changes
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log('i am log inside todo form', editingTodo);
      if (editingTodo?._id) {
        editTodo(values);
      } else {
        addTodo(values);
      }
      // unified create/edit function
      // clearEditing();
      resetForm();
      // reset to Add mode after submission
    },
  });
  const handleCancel = () => {
    formik.resetForm();
    clearEditing(); // exit edit mode
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
        </div>
        <button type="submit" className="submit">
          {formik.values._id ? 'Update Todo' : 'Add Todo'}
        </button>
        {formik.values._id ? (
          <button type="button" className="reset" onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="reset"
            onClick={() => {
              formik.resetForm();
              clearEditing();
            }}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoFormUsingFormik;
