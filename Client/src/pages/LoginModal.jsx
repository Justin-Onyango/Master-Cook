import React from "react";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import PropTypes from 'prop-types'; 

import { UserContext } from '../context/UserContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      login(values.email, values.password);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'orange' }}>Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              {...formik.getFieldProps('email')}
              className={`w-full px-3 py-2 border rounded ${formik.errors.email ? 'border-red-500' : ''}`}
              placeholder="name@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...formik.getFieldProps('password')}
              className={`w-full px-3 py-2 border rounded ${formik.errors.password ? 'border-red-500' : ''}`}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Login
            </button>
            <p className="mt-4 text-center text-black">
              Don&apos;t have an account? <Link to="/register" className="text-orange-500 underline" onClick={onClose}>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;