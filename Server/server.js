import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Foodie server is running!' });
});

// Connect to MongoDB
connectDB().catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Export app for Vercel
export default app;

