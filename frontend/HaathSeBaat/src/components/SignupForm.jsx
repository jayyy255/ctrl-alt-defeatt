import React, { useState } from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
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
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" 
               style={{ backgroundColor: '#8860D0', backgroundImage: 'url(/images/dots-pattern.svg)', backgroundSize: 'cover' }}>
      <Row className="w-100">
        <Col xs={12} lg={10} xl={8} className="mx-auto">
          <div className="p-5 rounded shadow" 
               style={{ 
                 minWidth: '90%', 
                 background: 'rgba(255, 255, 255, 0.9)',
                 borderRadius: '20px',
                 border: '5px solid #5AB9EA'
               }}>
            <div className="text-center mb-4">
              <AnimatedHeading className="display-4 fw-bold" 
                               style={{ color: '#5680E9', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                Start Your Sign Language Adventure
              </AnimatedHeading>
              <p className="lead text-secondary mb-4">Join our community of ASL learners today!</p>
            </div>

            {error && <AnimatedAlert show variant="danger" className="rounded-pill text-center">{error}</AnimatedAlert>}
            {success && <AnimatedAlert show variant="success" className="rounded-pill text-center">{success}</AnimatedAlert>}

            <Form onSubmit={handleSubmit} className="p-4">
              <AnimatedFormFields>
                <Row>
                  {formControls.map((control, index) => (
                    <Col md={index < 2 ? 6 : 6} key={index}>
                      <AnimatedFormGroup
                        custom={index}
                        label={control.label}
                        type={control.type}
                        name={control.name}
                        placeholder={control.placeholder}
                        value={formData[control.name]}
                        onChange={handleChange}
                        labelClassName="fw-bold text-primary"
                        inputClassName="form-control-lg border border-2 rounded-pill"
                        style={{ marginBottom: '25px' }}
                      />
                    </Col>
                  ))}
                </Row>

                <AnimatedButton 
                  type="submit" 
                  className="w-100 py-3 mt-4 rounded-pill fw-bold" 
                  loading={loading}
                  path = "/translator"
                  style={{ 
                    backgroundColor: '#F8E16C', 
                    color: '#5680E9',
                    fontSize: '1.2rem',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {loading ? 'Creating Your Account...' : 'Create Your Account'}
                </AnimatedButton>
              </AnimatedFormFields>
              
              <div className="text-center mt-4">
                <p className="mb-0 text-secondary">Already a member? <a href="/login" className="text-primary fw-bold">Sign in to play</a></p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;