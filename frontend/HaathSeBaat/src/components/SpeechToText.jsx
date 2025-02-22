import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./SpeechToText.css"; // Custom CSS for animations

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    console.log("Initializing SpeechRecognition...");

    // Initialize the SpeechRecognition object
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show interim results

    // Event handler for when speech is recognized
    recognition.onresult = (event) => {
      console.log("Speech detected. Processing results...");

      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log(`Result ${i}:`, transcript);

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      console.log("Interim Transcript:", interimTranscript);
      console.log("Final Transcript:", finalTranscript);

      setTranscript(finalTranscript || interimTranscript);
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    // Handle when recognition ends
    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setIsListening(false);
    };

    // Start or stop recognition based on `isListening` state
    if (isListening) {
      console.log("Starting speech recognition...");
      recognition.start();
    } else {
      console.log("Stopping speech recognition...");
      recognition.stop();
    }

    // Cleanup on component unmount
    return () => {
      console.log("Cleaning up speech recognition...");
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="display-4 mb-4" style={{ color: "#ffcc00" }}>
          Speech to Text
        </h1>
        <motion.button
          className={`btn btn-lg ${isListening ? "btn-danger" : "btn-primary"}`}
          onClick={() => setIsListening((prev) => !prev)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: isListening ? "#ff4444" : "#007bff",
            boxShadow: isListening
              ? "0 0 20px #ff4444"
              : "0 0 20px #007bff",
          }}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-5 p-4 bg-light text-dark rounded"
        style={{ width: "80%", maxWidth: "600px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-3" style={{ color: "#9933cc" }}>
          Transcript
        </h3>
        <div className="typewriter">
          <p style={{ color: "#333", fontSize: "1.2rem" }}>{transcript}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeechToText;