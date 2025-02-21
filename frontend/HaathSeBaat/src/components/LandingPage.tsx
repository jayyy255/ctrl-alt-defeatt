import React from "react";
import { motion } from "framer-motion";


function LandingPage() {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Haath Se Baat</h1>
        <p className="description">
          A playful way to make new friends, learn about another culture and gain new opportunities by <strong>learning Indian Sign Language together.</strong>
        </p>
        <div className="buttons">
          <button className="getstarted">Get Started!</button>
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
