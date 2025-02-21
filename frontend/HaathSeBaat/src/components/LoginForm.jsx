import React, { useState } from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import AnimatedHeading from './animated/AnimatedHeading';
import AnimatedFormGroup from './animated/AnimatedFormGroup';
import AnimatedButton from './animated/AnimatedButton';
import AnimatedFormFields from './animated/AnimatedFormFields';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setSuccess('Login successful!');
      localStorage.setItem('token', data.token);
      navigate('/translator');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center rounded shadow align-items-center vh-100" 
               style={{ backgroundColor: '#8860D0', backgroundSize: 'cover' }}>
      <div style={{ width: '75%', maxHeight: '450px' }} className="mx-auto">
        <div className="rounded shadow d-flex" 
             style={{ 
               background: 'rgba(255, 255, 255, 0.9)',
               borderRadius: '20px',
               border: '5px solid #5AB9EA',
               overflow: 'hidden'
             }}>
          {/* Left side - Image/Branding */}
          <div className="d-none d-md-block" style={{ width: '40%', backgroundColor: '#5680E9', padding: '20px' }}>
            <div className="h-100 d-flex flex-column justify-content-center align-items-center text-white">
              <h2 className="display-5 fw-bold mb-4">Level Up Your Sign Language</h2>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#F8E16C', 
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '60px' }}>👋</span>
              </div>
              <p className="text-center">Play interactive games and practice signing with friends!</p>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div style={{ width: '60%', padding: '30px' }}>
            <AnimatedHeading className="h3 fw-bold mb-4" 
                            style={{ color: '#5680E9' }}>
              Welcome Back
            </AnimatedHeading>

            {error && <Alert variant="danger" className="py-2">{error}</Alert>}
            {success && <Alert variant="success" className="py-2">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <AnimatedFormFields>
                <Row>
                  <Col xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold text-primary">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-2 rounded-pill"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col xs={12} className="mb-4">
                    <Form.Group>
                      <Form.Label className="fw-bold text-primary">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-2 rounded-pill"
                      />
                      <div className="d-flex justify-content-end mt-1">
                        <a href="/forgot-password" className="text-secondary small">Forgot password?</a>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <AnimatedButton
                  type="submit"
                  className="w-100 py-2 rounded-pill fw-bold"
                  loading={loading}
                  path='/translator'
                  style={{ 
                    backgroundColor: '#F8E16C', 
                    color: '#5680E9',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In & Play'}
                </AnimatedButton>
              </AnimatedFormFields>
              
              <div className="text-center mt-3">
                <p className="mb-0 text-secondary small">Don't have an account? <a href="/signup" className="text-primary fw-bold">Join the fun!</a></p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;