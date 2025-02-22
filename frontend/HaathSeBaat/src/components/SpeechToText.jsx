import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SpeechToText.css";
import AnimatedCard from "./animated/animatedCard";
import AnimatedHeading from "./animated/animatedHeading";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <AnimatedCard>    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-gradient" style={{ background: "linear-gradient(to right, #f1c40f, #27ae60, #9b59b6)", padding: "0", margin: "0", overflow: "hidden" }}>
    <AnimatedHeading>
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="display-4 mb-4" style={{ color: "#6a0dad" }}>
        Speech & Signs Recognition
      </h1>
      <motion.button
className={`btn btn-lg`}
style={{
  backgroundColor: isListening ? "#e74c3c" : "#2980b9", // Red and blue color scheme
  color: "#fff", // White text for contrast
  borderColor: "#fff", // White border for visibility
  boxShadow: isListening
    ? "0 0 15px rgba(231, 76, 60, 0.7)"
    : "0 0 15px rgba(41, 128, 185, 0.7)", // Shadow for depth
}}
onClick={() => setIsListening((prev) => !prev)}
whileHover={{ scale: 1.1 }} // Zoom in effect
whileTap={{ scale: 1.05 }}
transition={{ duration: 0.3 }}
>
{isListening ? "Stop Listening" : "Start Recognition"}
</motion.button>

    </motion.div>
    </AnimatedHeading>

    <motion.div
      className="mt-4 p-4 rounded"
      style={{ backgroundColor: "#f8f9fa", width: "80%", maxWidth: "600px", boxShadow: "0 0 15px rgba(0,0,0,0.2)", borderRadius: "12px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h4 className="mb-2" style={{ color: "#f39c12" }}>
        Transcript
      </h4>
      <div
        className="transcript-box"
        style={{ height: "150px", overflowY: "auto", backgroundColor: "#fff", padding: "10px", borderRadius: "10px", border: "1px solid #f39c12" }}
      >
        <motion.p
          style={{ fontFamily: "Arial, sans-serif", color: "#333", fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {transcript}
        </motion.p>
      </div>
    </motion.div>
  </div></AnimatedCard>
  );
};

export default SpeechToText;
