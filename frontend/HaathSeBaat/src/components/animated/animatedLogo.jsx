import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ text = "HaathSeBaat" }) => {
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0, rotate: -5 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const floatAnimation = {
    y: [-3, 3, -3],
    rotate: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className="logo-container"
      variants={logoVariants}
      initial="initial"
      animate="animate"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <motion.div 
        className="logo"
        animate={floatAnimation}
        style={{
          background: '#5680E9',
          color: '#F8E16C',
          padding: '15px 30px',
          borderRadius: '30px',
          boxShadow: '0 6px 0 #3A5BBF, 0 8px 20px rgba(0,0,0,0.2)',
          fontWeight: 'bold',
          fontSize: '2rem',
          position: 'relative',
          display: 'inline-block'
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '15%',
          width: '70%',
          height: '5px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '5px'
        }} />
        
        <span style={{ textShadow: '2px 2px 0 #3A5BBF' }}>{text}</span>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            backgroundColor: '#F8E16C',
            color: '#5680E9',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        >
          ✌️
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;