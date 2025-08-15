import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';




console.log('de puis app',process.env.MONGO_URL);

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
//create routes for  our project
app.use('/api/auth', authRoutes);

export default app;