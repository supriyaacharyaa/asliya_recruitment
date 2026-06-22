import Recruiter from '../models/Recruiter.js';
import generateToken from '../utils/generateToken.js';
import { body, validationResult } from 'express-validator';

/**
 * @desc Register recruiter
 */
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    const exists = await Recruiter.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const recruiter = await Recruiter.create({
      name,
      email,
      password,
      role: role || 'recruiter',
    });

    const token = generateToken(recruiter._id);

  res.status(201).json({
  success: true,
  token,
  user: {              // ✅ unified key
    _id: recruiter._id,
    name: recruiter.name,
    email: recruiter.email,
    role: recruiter.role,
  },
});
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login recruiter
 */
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email }).select('+password');

    if (!recruiter || !(await recruiter.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(recruiter._id);

    // res.json({
    //   success: true,
    //   token,
    //   recruiter: {
    //     _id: recruiter._id,
    //     name: recruiter.name,
    //     email: recruiter.email,
    //     role: recruiter.role,
    //   },
    // });
    res.json({
  success: true,
  token,
  user: {              // ✅ unified key
    _id: recruiter._id,
    name: recruiter.name,
    email: recruiter.email,
    role: recruiter.role,
  },
});
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get current user
 */
export const getMe = async (req, res, next) => {
  try {
    const recruiter = await Recruiter.findById(req.recruiter._id);
    res.json({ success: true, recruiter });
  } catch (error) {
    next(error);
  }
};

/**
 * Validation rules
 */
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
];