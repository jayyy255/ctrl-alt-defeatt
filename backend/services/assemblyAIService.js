import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY, // Ensure this matches the key in .env
});

export const transcribeAudio = async (audioUrl) => {
    const config = {
        audio_url: audioUrl,
    };

    try {
        const transcript = await client.transcripts.transcribe(config);
        return transcript.text;
    } catch (error) {
        console.error('Error transcribing audio:', error);
        throw error;
    }
};