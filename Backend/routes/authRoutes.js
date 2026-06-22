import express from 'express';
import {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
} from '../controller/authController.js';

import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', registerValidation, register);

// Login
router.post('/login', loginValidation, login);

// Get current user
router.get('/me', protect, getMe);

export default router;