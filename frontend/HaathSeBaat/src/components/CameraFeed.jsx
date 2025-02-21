import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CameraFeed = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
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
        startCamera();
    }, []);

    const captureFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert frame to PNG
            const frameData = canvas.toDataURL('image/png');

            // Send the frame to the backend
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
            console.log('Frame uploaded successfully.');
        } catch (error) {
            console.error('Failed to upload frame:', error);
        }
    };

    // Capture frame every 2 seconds (adjust as needed)
    useEffect(() => {
        const interval = setInterval(captureFrame, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <motion.h1
                className="text-center mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Live Camera Feed
            </motion.h1>
            <motion.div
                className="w-100 d-flex justify-content-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <motion.video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="rounded shadow-lg"
                    style={{ width: '100%', maxWidth: '640px' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                />
            </motion.div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraFeed;