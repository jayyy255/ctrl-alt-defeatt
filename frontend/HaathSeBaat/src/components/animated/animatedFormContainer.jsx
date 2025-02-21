import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedFormContainer = ({ activeTab, tabKey, children }) => {
  const formVariants = {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -15, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedFormContainer;