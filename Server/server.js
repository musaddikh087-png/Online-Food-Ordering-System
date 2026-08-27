import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Foodie server is running!' });
});

// Connect to the database before accepting requests.
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Foodie server is running on http://localhost:${PORT}`);
  });
};

startServer();
