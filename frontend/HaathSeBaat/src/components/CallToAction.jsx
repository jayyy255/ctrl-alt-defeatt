"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const CallToAction = () => {
  return (
    <div className="bg-warning py-5">
      <div className="container">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="fw-bold mb-4" style={{ color: "#6b46c1" }}>
            Ready to Start Your ISL Journey?
          </h2>
          <p className="fs-5 mb-4">
            Join our community today and embark on an exciting adventure of
            learning Indian Sign Language!
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="btn btn-success btn-lg fw-bold"
          >
            Sign Up Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
