import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-warning vh-100 d-flex align-items-center">
        
        <div className="container-fluid">
          <div className="row w-100">
            {/* Left Side - Text Content */}
            <div className="col-md-6 d-flex flex-column justify-content-center text-start ps-5">
              <h1 className="fw-bold">Haath Se Baat</h1>
              <p className="fs-5">
                
                  A playful way to make new friends, learn about another culture, 
                  and gain new opportunities by learning Indian Sign Language together.
                
              </p>
              <button className="btn btn-dark mt-3 w-50" onClick={() => navigate("/login")}>
                Get Started
              </button>
            </div>
  
            {/* Right Side - Animated Image */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <img src="/image.png" alt="Animated" className="img-fluid" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default LandingPage;
