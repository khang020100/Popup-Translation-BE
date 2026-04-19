import express from 'express';

import { getWords, saveWord } from '../controllers/vocabController.js';
import { getMe } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/me',protectedRoute ,getMe);

router.post('/save-word', protectedRoute, saveWord);

router.get('/get-words', protectedRoute, getWords);

export default router;