import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';
import errorMiddlware from './middlewares/errorMiddleware.js';

dotenv.config();
console.log("PORT",process.env.PORT)
console.log("MONGO_URL",process.env.MONGO_URL);

const Port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database is connected');
}).catch((err) => {
    console.log(err);
})



const server = http.createServer(app)
server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})

//middleware to handle errors
app.use(errorMiddlware)