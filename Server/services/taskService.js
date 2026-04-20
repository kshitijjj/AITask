import taskModel from '../models/task.js';
import {addTask} from '../config/queue.js';

export const assignTask=async({userId},{input,operation})=>{
    try {
        const newTask=new taskModel({userId:userId,input,operation,result:null,logs:[{message:"Task Received",timeStamp:new Date()}]})
        await newTask.save();
        
        await addTask(newTask._id,newTask.input,newTask.operation);

        return ({status:200,message:"Task send from api service and send to redis queue","taskId":newTask._id});
    } catch (error) {
        throw new Error(error.message);
    }
}

export const taskGet=async({userId},{taskId})=>{
    try {
        const task=await taskModel.findOne({userId:userId,_id:taskId});
        if(!task)return {status:404,message:"Task not found"};
        return {status:200,message:task};
    } catch (error) {
        throw new Error(error.message);
    }
}