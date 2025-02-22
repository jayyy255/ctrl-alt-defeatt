import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

const socket = io("http://localhost:8000");

const SignLanguageQuiz = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState('');

  const questions = [
    { id: 1, question: 'Show the sign for Thank You', expectedAnswer: 'Thank You' },
    { id: 2, question: 'Perform the sign for Hello', expectedAnswer: 'Hello' },
    { id: 3, question: 'Demonstrate the sign for I Love You', expectedAnswer: 'I Love you' }
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

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

  const sendFrameToBackend = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'frame.png');
    const question = questions[currentQuestion];

    socket.emit('video_frame', { img: blob, ans: question.expectedAnswer });
  };

  const startRecording = () => {
    setIsRecording(true);
    setFeedback('');
    setInterval(captureFrame, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  useEffect(() => {
    startCamera();

    socket.on('prediction', (data) => {
      const { match } = data;
      setFeedback(match ? '✅ Correct!' : '❌ Incorrect. Try again.');
    });

    return () => {
      socket.off('prediction');
    };
  }, []);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback('');
    } else {
      alert('Quiz completed!');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
      <motion.h1
        className="text-center mb-4 display-4 fw-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ color: '#fff' }}
      >
        Sign Language Quiz
      </motion.h1>

      <div className="mb-4 p-3 bg-white rounded shadow">
        <h3>{questions[currentQuestion].question}</h3>
      </div>

      <div className="video-section mb-3">
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded shadow-lg"
          style={{ width: '640px', border: '10px solid #fff' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {feedback && (
        <motion.div
          className="mt-3 p-2 bg-light rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {feedback}
        </motion.div>
      )}

      <div className="mt-4">
        {!isRecording ? (
          <button className="btn btn-primary me-2" onClick={startRecording}>🎥 Start Recording</button>
        ) : (
          <button className="btn btn-danger" onClick={stopRecording}>🛑 Stop Recording</button>
        )}
        <button className="btn btn-success ms-2" onClick={nextQuestion} disabled={!feedback}>➡️ Next Question</button>
      </div>
    </div>
  );
};

export default SignLanguageQuiz;
