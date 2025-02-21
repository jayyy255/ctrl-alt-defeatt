// import React from "react";
import { motion } from "framer-motion";


function LandingPage() {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Sign Party</h1>
        <p className="description">
          A playful way to make new friends, learn about another culture and gain new opportunities by <strong>learning American Sign Language together.</strong>
        </p>
        <div className="buttons">
          <button className="signup">Sign Up</button>
          <button className="login">Login</button>
        </div>
      </div>
      
      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="image-container"
      >
        <img src="/image.png" alt="Animated" className="image" />
      </motion.div>
    </div>
  );
}

export default LandingPage;
