import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cron from 'node-cron';
// import cleanupExpiredIntakes from './utils/cleanup.js'; // Uncomment if exists

dotenv.config();

const port = process.env.PORT || 5001;
connectDB(); // Connect to MongoDB

const app = express();

app.use(cors({
  origin: ['http://localhost:5173','https://searchmystudy.com','https://www.searchmystudy.com',"https://admin.coursefinder.co.in","https://coursefinder.co.in"], // React frontend
  credentials: true,
}));



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// --- ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/test', (req, res) => {
  res.send({ message: "all fix" });
});

// --- CRON JOBS ---
cron.schedule('0 * * * *', () => {
// --- ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/test', (req, res) => {
  res.send({ message: "all fix" });
});

// --- CRON JOBS ---
cron.schedule('0 * * * *', () => {
  console.log('Running cleanup for expired intakes...');
  // cleanupExpiredIntakes(); // Uncomment when ready
});
});
// --- SERVE FRONTEND IN PRODUCTION ---
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // Ensure compatibility with ES modules
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// --- ERROR HANDLING ---
app.use(notFound);
app.use(errorHandler);

// --- START SERVER ---
app.listen(port, () => console.log(`✅ Server started on port ${port}`));
