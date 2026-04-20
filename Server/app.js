import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import taskRoute from './routes/taskRoute.js';
import cors from 'cors';
import connectDB from './config/db.js';
import './config/redis.js';
dotenv.config();
connectDB();

const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/auth",authRoute);
app.use("/task",taskRoute);

app.listen(PORT,()=>{
    console.log(`Backend server running at port ${process.env.PORT}`);
})