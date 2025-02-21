import React from 'react';
import { motion } from 'framer-motion';
import { Form } from 'react-bootstrap';

const AnimatedFormGroup = ({ 
  label, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = true,
  showForgotPassword = false,
  custom 
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div variants={itemVariants} custom={custom}>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        {showForgotPassword && (
          <div className="text-end mt-1">
            <motion.a 
              href="#" 
              className="forgot-password"
              whileHover={{ color: '#7fb3d5', textDecoration: 'underline' }}
            >
              Forgot Password?
            </motion.a>
          </div>
        )}
      </Form.Group>
    </motion.div>
  );
};

export default AnimatedFormGroup;