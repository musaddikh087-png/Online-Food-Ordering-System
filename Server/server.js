import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect before API requests. This works both locally and in a Vercel
// serverless function, where the process must not call app.listen().
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    res.status(503).json({ message: 'Database service is unavailable.' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Foodie server is running!' });
});

// Vercel imports the Express app as a serverless handler. Only listen when the
// project is launched directly on a local machine.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Foodie server is running on http://localhost:${PORT}`);
  });
}

export default app;
