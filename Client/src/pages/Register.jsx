import React from "react";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, ref } from 'yup'; // Import specific components
import { UserContext } from '../context/UserContext';

function RegisterPage() {
  const { register } = useContext(UserContext);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  };

  const validationSchema = object().shape({
    name: string().required('Name is required'),
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    repeatPassword: string().oneOf([ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    register(values.name, values.email, values.password);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'orange' }}>Register</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="repeatPassword" className="block mb-2">Confirm Password</label>
                <Field
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Confirm Password"
                />
                <ErrorMessage name="repeatPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
                <p className="mt-4 text-center text-orange-500">
                  Already have an account? <Link to="/login" className="underline" style={{ color: 'orange' }}>Login</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterPage;