import React from "react";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types'; 
import { UserContext } from '../context/UserContext';

const RegisterModal = ({ isOpen, onClose }) => {
  const { register } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
      repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    }),
    onSubmit: values => {
      register(values.name, values.email, values.password);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'orange' }}>Register</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              {...formik.getFieldProps('name')}
              className={`w-full px-3 py-2 border rounded ${formik.errors.name ? 'border-red-500' : ''}`}
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
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
          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              {...formik.getFieldProps('repeatPassword')}
              className={`w-full px-3 py-2 border rounded ${formik.errors.repeatPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm Password"
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <div className="text-red-500">{formik.errors.repeatPassword}</div>
            ) : null}
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Register
            </button>
            <p className="mt-4 text-center text-black">
              Already have an account? <Link to="/login" className="text-orange-500 underline" onClick={onClose}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterModal;