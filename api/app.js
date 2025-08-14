import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';




console.log('de puis app',process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

export default app;