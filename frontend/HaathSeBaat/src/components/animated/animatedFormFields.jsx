import React from 'react';
import { motion } from 'framer-motion';

const AnimatedFormFields = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Decorative game elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#F8E16C',
          zIndex: -1
        }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: -5,
          left: 20,
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: '#5AB9EA',
          zIndex: -1
        }}
        animate={{
          x: [0, 15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {children}
    </motion.div>
  );
};

export default AnimatedFormFields;