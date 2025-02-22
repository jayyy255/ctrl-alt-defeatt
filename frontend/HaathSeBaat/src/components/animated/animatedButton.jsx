// AnimatedButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AnimatedButton = ({ 
  children, 
  loading = false, 
  variant = "primary", 
  className = '', 
  path = "*",
  style = {},
  ...props 
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, type: "spring" }
    }
  };

  const navigate = useNavigate();
  
  const LoadingSpinner = () => (
    <motion.div
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
      }}
    >
      <motion.span
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
      >
        ●
      </motion.span>
      <motion.span
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse", delay: 0.2 }}
      >
        ●
      </motion.span>
      <motion.span
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse", delay: 0.4 }}
      >
        ●
      </motion.span>
    </motion.div>
  );

  const defaultStyle = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    boxShadow: '0 4px 0 #6b46c1', 
    position: 'relative',
    top: 0,
    ...style
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ 
        scale: 0.95,
        y: 4,
        transition: { duration: 0.1 } 
      }}
    >
      <Button 
        variant={variant} 
        className={`px-4 py-2 ${className}`}
        disabled={loading}
        onClick={() => !loading && navigate(path)}
        style={defaultStyle}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
