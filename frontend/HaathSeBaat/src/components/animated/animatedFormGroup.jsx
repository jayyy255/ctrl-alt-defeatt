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
  labelClassName = '',
  inputClassName = '',
  custom,
  style = {},
  ...props
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const focusAnimation = {
    scale: 1.02,
    boxShadow: '0 0 0 3px rgba(248, 225, 108, 0.5)',
    transition: { duration: 0.2 }
  };

  const defaultLabelStyle = {
    color: '#5680E9',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '5px',
    display: 'block'
  };

  const defaultInputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #5AB9EA',
    borderRadius: '30px',
    padding: '10px 15px',
    fontSize: '1rem',
    transition: 'all 0.2s ease'
  };

  return (
    <motion.div 
      variants={itemVariants} 
      custom={custom}
      style={style}
      {...props}
    >
      <Form.Group className="mb-3 position-relative">
        <Form.Label 
          className={labelClassName} 
          style={defaultLabelStyle}
        >
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
        
        <motion.div
          whileFocus={focusAnimation}
          whileHover={{ scale: 1.01 }}
        >
          <Form.Control
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={inputClassName}
            style={defaultInputStyle}
          />
        </motion.div>
        
        {showForgotPassword && (
          <div className="text-end mt-2">
            <motion.a 
              href="/forgot-password" 
              className="forgot-password"
              style={{ 
                color: '#8860D0',
                fontSize: '0.85rem',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
              whileHover={{ 
                color: '#5AB9EA',
                textDecoration: 'underline'
              }}
            >
              Forgot Password?
            </motion.a>
          </div>
        )}

        {/* Decorative indicator */}
        <motion.div
          style={{
            position: 'absolute',
            right: '15px',
            top: '37px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: value ? '#5cb85c' : '#ddd'
          }}
          animate={{
            scale: value ? [1, 1.2, 1] : 1,
            backgroundColor: value ? '#5cb85c' : '#ddd'
          }}
          transition={{
            duration: 0.3
          }}
        />
      </Form.Group>
    </motion.div>
  );
};

export default AnimatedFormGroup;