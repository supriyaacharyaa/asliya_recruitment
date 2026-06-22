import express from 'express';
import {
  identifyVisitor,
  getAllVisitors,
  getVisitor,
} from '../controller/visitorController.js';

import { protect } from '../Middleware/authMiddleware.js';



const router = express.Router();

// Public
router.post('/identify', identifyVisitor);

// Admin
router.get('/', protect, getAllVisitors);
router.get('/:id', protect, getVisitor);

export default router;