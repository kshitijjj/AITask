import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis=new Redis(process.env.redisUrl);

redis.on("connect",()=>console.log("Redis Server Connected"));
redis.on("error",(error)=>console.log(error.message));
