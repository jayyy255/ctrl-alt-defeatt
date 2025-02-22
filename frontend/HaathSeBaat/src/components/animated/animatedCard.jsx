import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className, style = {}, ...props }) => {
  const defaultStyle = {
    backgroundColor: '#ffc107',
    borderRadius: '20px',
    border: '5px solid #e74c3c',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    padding: '25px',
    overflow: 'hidden',
    position: 'relative',
    ...style
  };

  const Decorations = () => (
    <>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(230, 76, 60, 0.2)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '-40px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(107, 70, 193, 0.1)',
        zIndex: 0
      }} />
    </>
  );

  return (
    <motion.div 
      className={`game-card ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        type: "spring",
        stiffness: 100
      }}
      style={defaultStyle}
      {...props}
    >
      <Decorations />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;