import express from 'express';
import {taskAssign,getTask} from '../controllers/taskController.js';
import verifyToken from '../middleware/token.js';
const route=express.Router();

route.post("/",verifyToken,taskAssign);
route.get("/:taskId",verifyToken,getTask);

export default route;