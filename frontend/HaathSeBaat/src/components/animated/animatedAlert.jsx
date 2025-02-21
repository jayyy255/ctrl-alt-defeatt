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
              background: variant === 'danger' ? 'rgba(255, 102, 102, 0.9)' : 'rgba(119, 221, 119, 0.9)',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              borderColor: variant === 'danger' ? '#ff5555' : '#5cb85c'
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