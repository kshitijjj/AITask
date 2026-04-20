import {assignTask,taskGet} from '../services/taskService.js';

export const taskAssign=async(req,res)=>{
    try {
        const taskAssignResponse=await assignTask(req.user,req.body);
        return res.status(taskAssignResponse.status).json(taskAssignResponse);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getTask=async(req,res)=>{
    try {
        const getTaskResponse=await taskGet(req.user,req.params);
        return res.status(getTaskResponse.status).json(getTaskResponse);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}