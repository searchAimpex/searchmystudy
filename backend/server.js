import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors package
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Use cors middleware with open settings to accept all requests
app.use(cors({
  origin: '*', // Accept all origins
  credentials: true, // Allow cookies in cross-origin requests (optional based on your needs)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/test',(req,res)=>{
  res.send({message:"all fix"})
})
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
