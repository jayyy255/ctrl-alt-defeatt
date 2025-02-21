import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className, ...props }) => {
  return (
    <motion.div 
      className={`auth-card ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;