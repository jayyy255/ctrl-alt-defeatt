const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// ✅ Dynamic CORS: Allow localhost, block others in production
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);  // Allow localhost
        } else {
            callback(new Error('❌ Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🛠 Middleware for JSON and large frames
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// 🔐 Authentication routes
app.use('/api/auth', require('./routes/auth'));

// 📸 Upload frame endpoint
app.post('/upload-frame', (req, res) => {
    const { frame } = req.body;
    if (!frame) {
        return res.status(400).json({ error: '❌ No frame received' });
    }

    // Convert base64 to PNG file
    const base64Data = frame.replace(/^data:image\/png;base64,/, '');
    const filename = `frame_${Date.now()}.png`;
    const filepath = path.join(__dirname, 'uploads', filename);

    // Ensure uploads directory exists
    fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });

    fs.writeFile(filepath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('❌ Error saving frame:', err);
            return res.status(500).json({ error: 'Failed to save frame' });
        }
        console.log(`✅ Frame saved as ${filename}`);
        res.json({ message: '✅ Frame uploaded successfully', filename });
    });
});

// 🌍 Root endpoint
app.get('/', (req, res) => res.send('🚀 API is running...'));

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
