import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert } from 'react-bootstrap';

const AnimatedAlert = ({ show, variant, children, ...props }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          {...props}
        >
          <Alert variant={variant}>{children}</Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedAlert;
    