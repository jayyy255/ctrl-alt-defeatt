import express from 'express';
import { transcribe } from '../controllers/transcriptionController.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.post('/transcribe', upload.single('audio'), transcribe);

export default router;