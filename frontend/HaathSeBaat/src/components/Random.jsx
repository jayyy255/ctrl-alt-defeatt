"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

const signs = [
  { name: "Tea", videoId: "l7GQ-fR-DsA" },
  { name: "Teach", videoId: "Brqv7-rpdTQ" },
  { name: "Vote", videoId: "eDr6D34kmcU" },
  { name: "Meditate", videoId: "0msmxYxchSc" },
  { name: "Voice", videoId: "tm_qJX6hHFg" },
]

export default function RandomSign() {
  const [currentSign, setCurrentSign] = useState(signs[0])
  const [isLoading, setIsLoading] = useState(false)

  const getRandomSign = () => {
    setIsLoading(true)
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * signs.length)
    } while (signs[randomIndex] === currentSign)

    setTimeout(() => {
      setCurrentSign(signs[randomIndex])
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gradient" style={{ background: "linear-gradient(to bottom right, #ffc400, #e74c3c)" }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-4 shadow-lg border border-4 border-success text-center w-75 w-md-50"
      >
        <h1 className="text-primary mb-3">Random ISL Sign</h1>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSign.videoId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-3 border border-4 border-primary p-2 rounded overflow-hidden"
          >
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${currentSign.videoId}?autoplay=1&mute=1&loop=1&playlist=${currentSign.videoId}`}
              title={currentSign.name}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded shadow-sm"
            ></iframe>
          </motion.div>
        </AnimatePresence>

        <motion.p className="fs-4 fw-semibold text-success">{currentSign.name}</motion.p>
        
        <motion.button
          onClick={getRandomSign}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`btn btn-lg fw-bold w-100 border border-2 ${isLoading ? "btn-secondary disabled" : "btn-danger"}`}
        >
          {isLoading ? "Loading..." : "Get Random Sign"}
        </motion.button>
      </motion.div>
    </div>
  )
}
