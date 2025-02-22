import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTab = ({ isActive, onClick, children }) => {
  const tabVariants = {
    active: {
      color: '#fff',
      backgroundColor: '#e74c3c',
      opacity: 1,
      scale: 1.05,
      y: 0,
      boxShadow: '0 4px 0 #6b46c1',
      transition: { duration: 0.3, type: "spring" }
    },
    inactive: {
      color: '#6b46c1',
      backgroundColor: '#ffc107',
      opacity: 0.8,
      scale: 1,
      y: 2,
      boxShadow: '0 2px 0 rgba(0,0,0,0.1)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.button 
      className={`game-tab-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
      variants={tabVariants}
      animate={isActive ? 'active' : 'inactive'}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: '0 6px 0 #6b46c1'
      }}
      whileTap={{ 
        scale: 0.95, 
        y: 4,
        boxShadow: '0 2px 0 #6b46c1'
      }}
      style={{
        border: 'none',
        borderRadius: '20px',
        padding: '8px 20px',
        margin: '0 5px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isActive && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transform: 'skewX(-20deg)',
            zIndex: 1
          }}
          animate={{
            left: ['0%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      )}
      
      <span style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedTab;