// server.js / index.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const bidRoutes = require('./routes/bidRoutes');

const app = express();
const server = http.createServer(app);


const io = socketIO(server, {
  cors: {
    origin: function (origin, callback) {
      const allowedOrigins = [
        'https://gigflow-arpit-yadav.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000'
      ];
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
  }
});

// Middleware
// UPDATED: CORS strictly tied to your hosted frontend URL [cite: 45]
const allowedOrigins = [
  'https://gigflow-arpit-yadav.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Check if the origin matches our production URL or any Vercel preview URL
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// MongoDB Connection
// UPDATED: Standard Atlas connection logic [cite: 11]
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully to Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Make io accessible to routes for real-time "Hired" notifications [cite: 41]
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes [cite: 31]
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

// Health check for hosting platforms (Render/Railway)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', env: process.env.NODE_ENV });
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Socket.io connection logic for real-time features [cite: 40, 41]
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Map logged-in user ID to their active socket for targeted notifications [cite: 41]
  socket.on('user:login', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  });

  socket.on('user:logout', (userId) => {
    connectedUsers.delete(userId);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

// Export io and connectedUsers so they can be accessed in bidRoutes.js/bidController.js [cite: 25, 41]
app.set('io', io);
app.set('connectedUsers', connectedUsers);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});