"use client"
import { motion } from "framer-motion"


const featuresList = [
  {
    title: "Interactive Lessons",
    description: "Engage with fun, interactive lessons designed to make learning ISL enjoyable and effective.",
    icon: "🎓",
  },
  {
    title: "Community Support",
    description: "Connect with a supportive community of learners and native ISL users.",
    icon: "👥",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your progress with detailed statistics and achievement badges.",
    icon: "📊",
  },
  {
    title: "Cultural Insights",
    description: "Gain valuable insights into Deaf culture and the importance of sign language.",
    icon: "🌍",
  },
]

const Features = () => {
  return (
    <div className="bg-light py-5" id="features">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-success">Our Features</h2>
        <div className="row" style={{ justifyContent: "flex-start", marginLeft: "auto", marginRight: "auto", maxWidth: "90%" }}>
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-md-6 col-lg-3 mb-4"
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="display-4 mb-3">{feature.icon}</div>
                  <h5 className="card-title fw-bold">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
              <div>
              </div>
            </motion.div>
          ))}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-12 d-flex justify-content-center mt-4"
          >
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-success btn-lg w-50 fw-bold text-white shadow-sm"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}



export default Features

