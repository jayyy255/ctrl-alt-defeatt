import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeading = ({ children, className = '', style = {}, ...props }) => {
  const defaultStyle = {
    color: '#5680E9',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    display: 'inline-block',
    ...style
  };

  // Create game-themed decorative elements
  const HeadingDecoration = () => (
    <>
      <motion.span
        style={{
          position: 'absolute',
          bottom: '-5px',
          left: '0',
          right: '0',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #F8E16C, transparent)',
          borderRadius: '2px',
          zIndex: -1
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );

  const letterVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    })
  };

  // Split the heading text into individual characters for animation
  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <motion.div 
      className={`game-heading-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', display: 'inline-block', margin: '0 auto' }}
      {...props}
    >
      <h2 style={defaultStyle}>
        {typeof children === 'string' ? renderAnimatedText(children) : children}
      </h2>
      <HeadingDecoration />
    </motion.div>
  );
};

export default AnimatedHeading;