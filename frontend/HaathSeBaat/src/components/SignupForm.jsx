// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import AnimatedHeading from './animated/AnimatedHeading';
import AnimatedAlert from './animated/animatedAlert';
import AnimatedFormGroup from './animated/AnimatedFormGroup';
import AnimatedButton from './animated/AnimatedButton';
import AnimatedFormFields from './animated/AnimatedFormFields';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      setSuccess('Account created successfully! You can now log in.');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formControls = [
    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
    { label: 'Email address', type: 'email', name: 'email', placeholder: 'Enter email' },
    { label: 'Password', type: 'password', name: 'password', placeholder: 'Create password' },
    { label: 'Confirm Password', type: 'password', name: 'confirmPassword', placeholder: 'Confirm password' }
  ];

  return (
    <div className="form-container">
      <AnimatedHeading>Create Account</AnimatedHeading>

      {error && <AnimatedAlert show variant="danger">{error}</AnimatedAlert>}
      {success && <AnimatedAlert show variant="success">{success}</AnimatedAlert>}

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
            />
          ))}

          <AnimatedButton type="submit" className="w-100 signup-btn" loading={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </AnimatedButton>
        </AnimatedFormFields>
      </Form>
    </div>
  );
};

export default SignupForm;
