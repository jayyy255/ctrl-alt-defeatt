import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert } from 'react-bootstrap';

const AnimatedAlert = ({ show, variant, children, ...props }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...props}
        >
          <Alert 
            variant={variant} 
            className="rounded-pill border-3 shadow-sm"
            style={{
              background: variant === 'danger' ? '#e54e49' : '#198754',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              borderColor: variant === 'danger' ? '#e74c3c' : '#198754'
            }}
          >
            {variant === 'danger' ? '❌ ' : '✅ '}{children}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedAlert;