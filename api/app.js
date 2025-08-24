import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/users.route.js';
import postsRoutes from './routes/posts.route.js';
import commentsRoutes from './routes/comment.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log('__dirname:', __dirname);

// Set the environment variable for the MongoDB connection string
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
// Serve static files from the 'public' directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads'))); //

// app.use("api/uploads/",express.static(__dirname + "/api/uploads")); // Serve static files from the 'public' directory
//create routes for  our project
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);


export default app;