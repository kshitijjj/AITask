import express from 'express';
import {userSignup,userOtp,refreshToken} from '../controllers/authController.js';
const route=express.Router();

route.post("/signup",userSignup);
route.post("/otp-authentication",userOtp);
route.post("/refresh",refreshToken);

export default route;