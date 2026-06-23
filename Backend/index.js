// backend/server.js
// Main entry point - sets up Express app, Socket.io, MongoDB connection

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Internal imports
import connectDB from './config/db.js';
import { initializeSocket } from './socket/socketServer.js';
import errorMiddleware from './Middleware/ErrorMiddleware.js';
import mongoSanitizeMiddleware from './Middleware/mongoSanitize.js';

// Chat / recruitment app routes
import authRoutes from './routes/authRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Admin / dashboard routes (merged from app.js)
import AdminRoute from './routes/AdminRoute.js';
import blogRoutes from './routes/blogRoutes.js';
import enquiryRoutes from './routes/enquiryRoute.js';
import jobRoutes from './routes/jobRoutes.js';
import jobApplicationRoutes from './routes/jobApplicationRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import EnquiryRoutes from './routes/EnquiryRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import jobViewRoutes from './routes/jobViewRoutes.js';

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = http.createServer(app);

// ─── Allowed Origins (env-driven, works for local + hosted) ───────────
// Set CLIENT_URLS as a comma-separated list in production, e.g.:
// CLIENT_URLS=https://www.asliyarecruitment.com,https://asliyarecruitment.com
// const allowedOrigins = (
//   process.env.CLIENT_URLS ||
//   process.env.CLIENT_URL ||
//   'http://localhost:5173,http://localhost:5174'
// )
//   .split(',')
//   .map((s) => s.trim())
//   .filter(Boolean);
const allowedOrigins = (
  process.env.CLIENT_URLS ||
  process.env.CLIENT_URL ||
  'http://localhost:5173,http://localhost:5174'
)
  .split(',')
  .map((s) => s.trim().replace(/\/$/, '')) // strip trailing slash
  .filter(Boolean);

// Socket.io setup
// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, '');

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.log('Blocked Socket origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Initialize socket handlers
initializeSocket(io);

// Make io accessible in routes/controllers
app.set('io', io);

// ─── CORS (placed first so it always responds, even on later errors) ──
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     console.log('Blocked CORS origin:', origin);
//     return callback(null, false);
//   },
//   credentials: true,
// }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, '');

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.log('Blocked CORS origin:', origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

// ─── Security Middlewares ────────────────────────────────────────────
app.use(helmet());
app.use(mongoSanitizeMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── API Routes: chat / recruitment app ──────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);

// ─── API Routes: admin / dashboard ───────────────────────────────────
app.use('/api/admin', AdminRoute);
app.use('/api/blog', blogRoutes);
app.use('/api', enquiryRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/jobs', jobApplicationRoutes); // fixed missing leading slash
app.use('/api/stats', statsRoutes);
app.use('/api/enquiries', EnquiryRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/job-views', jobViewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Asliya Recruitment API running' });
});
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Asliya Recruitment API running' });
});

// ─── Error Handler ───────────────────────────────────────────────────
app.use(errorMiddleware);





// ─── Start Server ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Asliya Recruitment Server running on port ${PORT}`);
  console.log(`📡 Socket.io ready`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
console.log('Allowed origins:', allowedOrigins);
export default { app, io };

