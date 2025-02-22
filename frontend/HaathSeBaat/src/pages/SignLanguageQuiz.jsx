import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import AnimatedCard from "../components/animated/AnimatedCard";

// Set up socket connection
const socket = io("http://localhost:8000");

const SignLanguageQuiz = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = [
    { id: 1, question: "Show the sign for 'Thank You'", answer: "Thank You" },
    { id: 2, question: "Show the sign for 'Hello'", answer: "Hello" },
    { id: 3, question: "Show the sign for 'Sorry'", answer: "Sorry" },
  ];

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("🚫 Error accessing the camera:", error);
    }
  };

  // Capture frame from video
  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(sendFrameToBackend, "image/png");
    }
  };

  // Send frame to backend
  const sendFrameToBackend = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "frame.png");

    const currentQuestion = questions[currentQuestionIndex];
    socket.emit("video_frame", { img: blob, ans: currentQuestion.answer });
  };

  // Start frame capture
  const startUploading = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      if (!isCorrect) {
        captureFrame();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  // Stop frame capture
  const stopUploading = () => {
    setIsUploading(false);
    setPrediction("");
  };

  useEffect(() => {
    startCamera();

    // Listen for backend prediction
    socket.on("prediction", (data) => {
      setPrediction(data.prediction);
      if (data.match) {
        setIsCorrect(true);
        setTimeout(() => {
          setIsCorrect(false);
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 2000);
      }
    });

    return () => {
      socket.off("prediction");
      stopUploading();
    };
  }, [currentQuestionIndex]);

  return (
    <AnimatedCard>
      <div
        className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
      >
        <motion.h1
          className="text-center mb-4 display-4 fw-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ color: "#fff" }}
        >
          ✋ Sign Language Quiz
        </motion.h1>

        {currentQuestionIndex < questions.length ? (
          <>
            <h2 className="text-white mb-3">
              {questions[currentQuestionIndex].question}
            </h2>
            <motion.video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded shadow-lg mb-3"
              style={{ width: "640px", border: "10px solid #fff" }}
            />

            {isUploading ? (
              <motion.button
                className="btn btn-danger"
                whileHover={{ scale: 1.1 }}
                onClick={stopUploading}
              >
                🛑 Stop Uploading
              </motion.button>
            ) : (
              <motion.button
                className="btn btn-success"
                whileHover={{ scale: 1.1 }}
                onClick={startUploading}
              >
                🚀 Start Answering
              </motion.button>
            )}

            {prediction && (
              <motion.div
                className="mt-4 p-3 rounded shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  backgroundColor: "#fff",
                  color: isCorrect ? "green" : "red",
                }}
              >
                {isCorrect
                  ? "✅ Correct! Moving to next question..."
                  : `❌ Predicted: ${prediction}`}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="p-4 rounded shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ backgroundColor: "#fff", color: "#007bff" }}
          >
            🎉 Quiz Complete! Great Job!
          </motion.div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </AnimatedCard>
  );
};

export default SignLanguageQuiz;
