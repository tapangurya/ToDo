/* eslint-disable no-unused-vars */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../CSS/Form.css';
const initialValues = {
  title: '',
  description: '',
};
const onSubmit = (values, { resetForm }) => {
  
  resetForm();
  console.log('Form data', values);
};
const validate = (values) => {
  // values.title values.description
  // errors.title errors.description
  // errors.name = 'This field is required'
  let errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Title is required';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Description is required';
  }

  return errors;
};
const validationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required'),
  description: Yup.string().trim().required('Description is required'),
});

const TodoFormUsingFormik = ({addTodo}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });
  // console.log('Form values: ', formik.values);
  // console.log('Form error: ', formik.errors);
  console.log('Visited fields: ', formik.touched);

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
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.title}
            {...formik.getFieldProps('description')}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>
        <button type="submit" className="submit">
          Add Todo
        </button>
        <button type="reset" className="reset">
          Clear
        </button>
      </form>
    </div>
  );
};

export default TodoFormUsingFormik;
