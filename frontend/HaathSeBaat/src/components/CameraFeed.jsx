import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const CameraFeed = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    let intervalRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing the camera:', error);
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
            const frameData = canvas.toDataURL('image/png');
            sendFrameToBackend(frameData);
        }
    };

    const sendFrameToBackend = async (pngData) => {
        try {
            await fetch('http://localhost:3000/upload-frame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ frame: pngData })
            });
            console.log('✅ Frame uploaded successfully.');
        } catch (error) {
            console.error('❌ Failed to upload frame:', error);
        }
    };

    const startUploading = () => {
        setIsUploading(true);
        intervalRef.current = setInterval(captureFrame, 1000);
    };

    const stopUploading = () => {
        setIsUploading(false);
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startCamera();
        return () => stopUploading();
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

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraFeed;
