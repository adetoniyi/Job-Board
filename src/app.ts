import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/job.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import applicationRoutes from './routes/application.routes';
import { errorHandler } from './middlewares/error.middleware';

import mongoose from 'mongoose';
import connectDB from './config/db';

// Connect to MongoDB
connectDB();
// Initialize dotenv to load environment variables
// Ensure that the MONGODB_URL is defined in the environment variables
if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL is not defined in environment variables');
}
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    });
// Initialize dotenv to load environment variables
// Ensure that the JWT_SECRET is defined in the environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}
// Initialize dotenv to load environment variables
// Ensure that the JWT_SECRET is defined in the environment variables


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.use(errorHandler);

export default app;
