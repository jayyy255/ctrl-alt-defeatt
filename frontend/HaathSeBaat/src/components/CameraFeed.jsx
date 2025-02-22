import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const CameraFeed = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [prediction, setPrediction] = useState('');
    const wsRef = useRef(null);

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

    // Start WebSocket connection
    const startStreaming = () => {
        if (!wsRef.current) {
            wsRef.current = new WebSocket('ws://127.0.0.1:5000/ws');

            wsRef.current.onopen = () => {
                console.log('✅ WebSocket connected.');
                setIsStreaming(true);
                captureAndSendFrame();
            };

            wsRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.prediction) {
                    setPrediction(data.prediction);
                }
            };

            wsRef.current.onerror = (error) => {
                console.error('❌ WebSocket error:', error);
            };

            wsRef.current.onclose = () => {
                console.log('🔒 WebSocket closed.');
                setIsStreaming(false);
            };
        }
    };

    // Capture and send frame
    const captureAndSendFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas && wsRef.current?.readyState === WebSocket.OPEN) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (blob) {
                    blob.arrayBuffer().then((buffer) => {
                        wsRef.current.send(buffer);
                    });
                }
            }, 'image/jpeg');

            requestAnimationFrame(captureAndSendFrame);
        }
    };

    // Stop WebSocket streaming
    const stopStreaming = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsStreaming(false);
        setPrediction('');
    };

    useEffect(() => {
        startCamera();
        return () => stopStreaming(); // Cleanup
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
                {isStreaming && (
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
                        Streaming...
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
                {!isStreaming ? (
                    <motion.button
                        className="btn btn-success me-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startStreaming}
                    >
                        🚀 Start Streaming
                    </motion.button>
                ) : (
                    <motion.button
                        className="btn btn-danger"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={stopStreaming}
                    >
                        🛑 Stop Streaming
                    </motion.button>
                )}
            </div>

            {/* Hidden Canvas for Frame Capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraFeed;