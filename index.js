const express = require('express');
const dotenv = require('dotenv').config();  
const connectDB = require('./config/db');  
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Use your CORS origin from .env
    credentials: true,
    maxAge: 14400,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
