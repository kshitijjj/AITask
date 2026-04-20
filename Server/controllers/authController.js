import { tryCatch } from 'bullmq';
import {signupUser,otpUser,tokenRefresh} from '../services/authService.js';

export const userSignup=async(req,res)=>{
    try {
        const userSignupResponse=await signupUser(req.body);
        if(userSignupResponse.expiry < Date.now())return res.status(400).json({message:"OTP Expired"});
        return res.status(userSignupResponse.status).json(userSignupResponse);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const userOtp=async(req,res)=>{
    try {
        const userOtpResponse=await otpUser(req.body);
        return res.status(userOtpResponse.status).json(userOtpResponse);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const refreshToken=async(req,res)=>{
    try {
        const refreshTokenResponse=await tokenRefresh(req.body);
        return res.status(refreshTokenResponse.status).json(refreshTokenResponse);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}