import express from 'express';
import {
  getAllConversations,
  getConversation,
  getVisitorMessages,
  assignRecruiter,
  closeConversation,
} from '../controller/conversationController.js';

import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Public visitor route
router.get('/:conversationId/visitor/:visitorId', getVisitorMessages);

// Admin routes
router.get('/', protect, getAllConversations);
router.get('/:id', protect, getConversation);
router.put('/:id/assign', protect, assignRecruiter);
router.put('/:id/close', protect, closeConversation);

export default router;