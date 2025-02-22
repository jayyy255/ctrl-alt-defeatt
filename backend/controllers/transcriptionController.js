import { transcribeAudio } from '../services/assemblyAIService.js';

export const transcribe = async (req, res) => {
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ error: '❌ No audio file provided' });
    }

    try {
        const audioUrl = `http://localhost:3000/uploads/${audioFile.filename}`;
        const transcript = await transcribeAudio(audioUrl);
        res.json({ text: transcript });
    } catch (error) {
        console.error('Error in transcription:', error);
        res.status(500).json({ error: 'Failed to transcribe audio' });
    }
};