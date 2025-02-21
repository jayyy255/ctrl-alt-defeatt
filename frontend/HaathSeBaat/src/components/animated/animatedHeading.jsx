import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeading = ({ children, className = '', ...props }) => {
  return (
    <motion.h2 
      className={`text-center mb-4 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.h2>
  );
};

export default AnimatedHeading; 