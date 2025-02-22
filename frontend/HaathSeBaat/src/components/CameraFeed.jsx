import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

// Set up socket connection
const socket = io("http://localhost:5000");

const CameraFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prediction, setPrediction] = useState('');
  let intervalRef = useRef(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('🚫 Error accessing the camera:', error);
    }
  };

  // Capture frame from video
  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(sendFrameToBackend, 'image/png');
    }
  };

  // Send frame to Flask backend
  const sendFrameToBackend = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'frame.png');
    socket.emit('video_frame', blob);
  };

  // Start frame upload
  const startUploading = () => {
    setIsUploading(true);
    intervalRef.current = setInterval(captureFrame, 1000); // Capture every second
  };

  // Stop frame upload
  const stopUploading = () => {
    setIsUploading(false);
    clearInterval(intervalRef.current);
    setPrediction(''); // Clear prediction when stopped
  };

  useEffect(() => {
    startCamera();

    // Listen for prediction results
    socket.on('prediction', (data) => {
      console.log('Received prediction:', data);
      setPrediction(data.prediction);
    });

    return () => {
      socket.off('prediction');
      stopUploading();
    };
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
      <motion.h1
        className="text-center mb-4 display-4 fw-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ color: '#fff', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)' }}
      >
        🎥 Live Camera Feed
      </motion.h1>

      {/* Video Feed */}
      <motion.div
        className="w-100 d-flex justify-content-center position-relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded shadow-lg"
          style={{
            width: '100%',
            maxWidth: '640px',
            border: '10px solid #ffffff',
            boxShadow: '0 0 30px rgba(98, 0, 234, 0.8)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
        {isUploading && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: '#ff6f61',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 0 15px rgba(255, 111, 97, 0.8)',
            }}
          >
            Uploading...
          </div>
        )}
      </motion.div>

      {/* Prediction Display */}
      {prediction && (
        <motion.div
          className="mt-4 p-3 rounded shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#007bff',
            boxShadow: '0 0 30px rgba(0, 123, 255, 0.8)',
          }}
        >
          🟢 Prediction: {prediction}
        </motion.div>
      )}

      {/* Start/Stop Buttons */}
      <div className="mt-4">
        {!isUploading ? (
          <motion.button
            className="btn btn-success me-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startUploading}
          >
            🚀 Start Uploading
          </motion.button>
        ) : (
          <motion.button
            className="btn btn-danger"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={stopUploading}
          >
            🛑 Stop Uploading
          </motion.button>
        )}
      </div>

      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraFeed;