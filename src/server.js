import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import connectDB from './libs/db.js';
import { protectedRoute } from './middlewares/authMiddlewares.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.use(protectedRoute);
app.use('/api/user', userRoute);