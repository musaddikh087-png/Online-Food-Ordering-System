import mongoose from 'mongoose';

// Serverless functions may handle several requests in one process. Reuse the
// existing connection instead of opening a new MongoDB connection per request.
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not configured.');
  }

  const connection = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

export default connectDB;
