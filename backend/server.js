require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB Atlas / Local Instance
connectDB();

// Express Configuration Middlewares
app.use(cors({
  origin: '*', // Dynamic allowed origins can be loaded from env in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Global API rate limiting
app.use('/api', generalLimiter);

// Bind API Routes
app.use('/api/v1/notes', noteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'NoteNova backend server is online.' });
});

// Central Error Handler Middleware (Must be last)
app.use(errorHandler);

// Launch Express Server
app.listen(PORT, () => {
  console.log(`NoteNova backend server running on port ${PORT} in [${process.env.NODE_ENV || 'development'}] mode`);
});
