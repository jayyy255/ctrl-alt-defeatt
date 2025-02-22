"use client";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate()
  return (
    <div
      className="bg-success bg-gradient min-vh-100 d-flex align-items-center"
      id="home"
    >
      <div className="container">
        <div className="row w-100">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-md-6 d-flex flex-column justify-content-center text-start ps-5"
          >
            <h1 className="fw-bold text-white display-3 mb-4">Haath Se Baat</h1>
            <p className="fs-4 text-white mb-4">
              A playful way to make new friends, learn about another culture,
              and gain new opportunities by learning Indian Sign Language
              together.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-light btn-lg w-50 fw-bold text-success shadow-sm"
            >
              Get Started
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="col-md-6 d-flex align-items-center"
          >
            <img src="/image.png" alt="Animated" className="img-fluid" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
