import jwt from 'jsonwebtoken';
import { sendOtp } from '../config/mail.js';
import userModel from '../models/user.js';
import { uniqueNamesGenerator, names, adjectives, NumberDictionary } from 'unique-names-generator';
import dotenv from 'dotenv';
dotenv.config();

let backendOtp={};
export const signupUser=async({email})=>{
    try {
        console.log(email);
        backendOtp=await sendOtp(email);
        return {status:200,message:`OTP sent successfully to email : ${email}`,"Otp":backendOtp.Otp,"expiry":backendOtp.expiry};
    } catch (error) {
        throw new Error({message:error.message});
    }
}

export const otpUser=async({email,otp})=>{
    try {
        if(otp!==backendOtp.Otp)return {status:401,message:"OTP not authenticated"};

        const generateUsername = () => {
            return uniqueNamesGenerator({
                dictionaries: [names, NumberDictionary.generate({min:10,max:30})],
                separator: '_',
                style: 'lowerCase'
            });
        };

        const newUser=new userModel({name:generateUsername(),email});
        await newUser.save();

        const accessToken=jwt.sign({userId:newUser._id,userName:newUser.name,userEmail:newUser.email},process.env.secretKey,{expiresIn:"1h"});
        const refreshToken=jwt.sign({userId:newUser._id,userName:newUser.name,userEmail:newUser.email},process.env.secretKey,{expiresIn:"7d"});

        return {status:201,message:"User login successfully","accessToken":accessToken,"refreshToken":refreshToken};
    } catch (error) {
        throw new Error({message:error.message});
    }
}

export const tokenRefresh=async({refreshToken})=>{
    try {
        const decode=jwt.verify(refreshToken,process.env.secretKey);
        if(!decode)return {status:409,message:"Token not validated"}
        const accessToken=jwt.sign({userId:decode.userId,userName:decode.userName,userEmail:decode.userEmail},process.env.secretKey,{expiresIn:"1h"});
        return {status:200,message:"New access token assigned","accessToken":accessToken};
    } catch (error) {
        throw new Error({message:error.message});
    }
}