import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ text = "HaathSeBaat" }) => {
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <motion.div
      className="logo-container"
      variants={logoVariants}
      initial="initial"
      animate="animate"
    >
      <div className="logo text-center fs-2 p-3">
        <span className="logo-text">{text}</span>
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;