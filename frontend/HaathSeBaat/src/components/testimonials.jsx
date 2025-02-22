"use client"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student",
    content: "Haath Se Baat has made learning ISL so much fun! I love the daily challenges and interactive lessons.",
  },
  {
    name: "Rahul Verma",
    role: "Teacher",
    content: "As an educator, I find this platform incredibly valuable for promoting inclusivity in my classroom.",
  },
  {
    name: "Anita Desai",
    role: "Deaf Community Member",
    content:
      "It's heartwarming to see so many people interested in learning ISL. This platform is bridging communication gaps.",
  },
]

const Testimonials = () => {
  return (
    <div className="bg-success text-white py-5" id="testimonials">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-md-4 mb-4"
            >
              <div className="card h-100 bg-light text-dark">
                <div className="card-body">
                  <p className="card-text">{testimonial.content}</p>
                  <h5 className="card-title mb-0">{testimonial.name}</h5>
                  <p className="card-subtitle text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials

