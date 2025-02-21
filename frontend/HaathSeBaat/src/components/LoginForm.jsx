// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import AnimatedHeading from './animated/AnimatedHeading';
import AnimatedAlert from './animated/animatedAlert';
import AnimatedFormGroup from './animated/AnimatedFormGroup';
import AnimatedButton from './animated/AnimatedButton';
import AnimatedFormFields from './animated/AnimatedFormFields';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      setSuccess('Login successful!');
      localStorage.setItem('token', data.token);
      // Redirect or update app state here
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formControls = [
    { label: "Email address", type: "email", name: "email", placeholder: "Enter email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter password", showForgotPassword: true }
  ];

  return (
    <div className="form-container">
      <AnimatedHeading>Welcome Back</AnimatedHeading>
      
      <AnimatedAlert show={!!error} variant="danger">
        {error}
      </AnimatedAlert>
      
      <AnimatedAlert show={!!success} variant="success">
        {success}
      </AnimatedAlert>
      
      <Form onSubmit={handleSubmit}>
        <AnimatedFormFields>
          {formControls.map((control, index) => (
            <AnimatedFormGroup
              key={index}
              custom={index}
              label={control.label}
              type={control.type}
              name={control.name}
              placeholder={control.placeholder}
              value={formData[control.name]}
              onChange={handleChange}
              showForgotPassword={control.showForgotPassword}
            />
          ))}

          <AnimatedButton 
            type="submit" 
            className="w-100 login-btn"
            loading={loading}
          >
            Login
          </AnimatedButton>
        </AnimatedFormFields>
      </Form>
    </div>
  );
};

export default LoginForm;