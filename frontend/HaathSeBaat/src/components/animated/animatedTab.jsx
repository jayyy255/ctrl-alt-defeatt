import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTab = ({ isActive, onClick, children }) => {
  const tabVariants = {
    active: {
      color: 'var(--primary-color)',
      opacity: 1,
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    inactive: {
      color: 'var(--text-color)',
      opacity: 0.7,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.button 
      className={`tab-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
      variants={tabVariants}
      animate={isActive ? 'active' : 'inactive'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedTab;