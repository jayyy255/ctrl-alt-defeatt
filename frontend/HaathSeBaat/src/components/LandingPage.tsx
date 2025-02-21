import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-success bg-gradient vh-100 d-flex align-items-center">
        <div className="container-fluid">
          <div className="row w-100">
            {/* Left Side - Text Content */}
            <div className="col-md-6 d-flex flex-column justify-content-center text-start ps-5">
              <h1 className="fw-bold text-white">Haath Se Baat</h1>
              <p className="fs-5 text-white">
                A playful way to make new friends, learn about another culture,
                and gain new opportunities by learning Indian Sign Language
                together.
              </p>
              <button
                className="getstarted-button btn-dark mt-3 w-50"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>

            {/* Right Side - Animated Image */}
            <div className="col-md-6 d-flex  align-items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <img src="/image.png" alt="Animated" className="img-fluid" />
              </motion.div>
            </div>
            <div
              className="sign-of-the-day-section py-5"
              style={{ backgroundColor: "#f4c842" }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4 text-start">
                    <h2 className="fw-bold">Sign of the Day</h2>
                    <p className="fs-5">
                      <strong>Party:</strong> A social gathering of invited
                      guests, typically involving eating, drinking, and
                      enjoyment.
                    </p>
                  </div>
                  <div className="col-md-4 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="video-container">
                        <video width="200" height="150" controls>
                          <source src="/sign_video.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-md-4 text-end">
                    <div
                      className="challenge-box p-3 text-white"
                      style={{
                        backgroundColor: "#e74c3c",
                        
                      }}
                    >
                      <p className="mb-1">
                        Learn a new ASL word every day through our{" "}
                        <strong>Daily Sign Challenge</strong>
                      </p>
                      <button className="btn btn-light">Join Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
