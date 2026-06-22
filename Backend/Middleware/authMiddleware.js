// import jwt from 'jsonwebtoken';
// import Recruiter from '../models/Recruiter.js';

// /**
//  * Protect routes - verify JWT token
//  */
// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ error: 'Not authorized. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.recruiter = await Recruiter.findById(decoded.id).select('-password');

//     if (!req.recruiter) {
//       return res.status(401).json({ error: 'Recruiter not found.' });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token. Please log in again.' });
//   }
// };

// /**
//  * Restrict to admin only
//  */
// export const adminOnly = (req, res, next) => {
//   if (req.recruiter && req.recruiter.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ error: 'Access denied. Admin only.' });
//   }
// };

// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Recruiter from '../models/Recruiter.js';
import Admin from '../models/Adminuser.js';

/**
 * Protect routes - checks both Admin and Recruiter collections
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try Admin first, fall back to Recruiter
    let user = await Admin.findById(decoded.id).select('-password');
    if (!user) {
      user = await Recruiter.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Attach as req.user so both admin + recruiter routes work uniformly
    req.user = user;

    // Keep req.recruiter alias so existing controllers don't break
    req.recruiter = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }
};

/**
 * Restrict to admin only
 */
export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin only.' });
  }
};