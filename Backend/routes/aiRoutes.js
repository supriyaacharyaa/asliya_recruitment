import express from 'express';
import { triggerAIResponse } from '../controller/aiController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// POST /api/ai/respond
router.post('/respond', protect, triggerAIResponse);

export default router;