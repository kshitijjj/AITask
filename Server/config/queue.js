import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const taskQueue=new Queue("task",{
    connection:{
        host:process.env.redisHost,
        port:process.env.redisPort
    }
});

export const addTask=async(taskId,input,operation)=>{
    await taskQueue.add('Task',{taskId,input,operation})
}