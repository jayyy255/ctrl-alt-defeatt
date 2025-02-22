"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignOfTheDay = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid mx-0 px-0"
      style={{ backgroundColor: "#f4c842", minHeight: "60vh" }}
      id="about-us"
    >
      <div className="d-flex flex-column h-100 justify-content-between py-5">
        <div
          className="row align-items-center justify-content-center text-center"
          style={{ color: "#6b46c1" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-md-4"
          >
            <h2 className="fw-bold">Sign of the Day</h2>
            <p className="fs-5">
              <strong>Party:</strong> A social gathering of invited guests,
              typically involving eating, drinking, and enjoyment.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="col-md-4"
          >
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/ciKoJA7fuQc?si=fLcLguvCxFh01Be7"
              title="Sign of the Day"
              allow="autoplay; encrypted-media"
            ></iframe>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="m-5"
        >
          <div
            className="challenge-box w-100 p-4 text-white text-center"
            style={{
              backgroundColor: "#e74c3c",
              borderRadius: "5px",
              width: "100vw" ,
              
            }}
          >
            <p className="mb-3 fs-5">
              Learn a new ISL word every day through our{" "}
              <strong>Daily Sign Challenge</strong>.
            </p>
            <button
              className="btn btn-light"
              onClick={() => navigate("/signup")}
            ><strong>Join Now</strong>
              
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignOfTheDay;
