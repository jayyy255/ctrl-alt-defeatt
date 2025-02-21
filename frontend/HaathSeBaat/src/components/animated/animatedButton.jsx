import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AnimatedButton = ({ 
  children, 
  loading = false, 
  variant = "primary", 
  className = '', 
  path = "*" ,
  ...props 
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const navigate = useNavigate() 
  const LoadingSpinner = () => (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      style={{ display: 'inline-block' }}
    >
      ↻
    </motion.span>
  );

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button 
        variant={variant} 
        className={className}
        disabled={loading}
        onClick={() => navigate(path)}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;