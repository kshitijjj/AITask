import { BrevoClient } from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const brevo = new BrevoClient({
  apiKey: process.env.Brevo_Api_Key
});

export const sendOtp = async(email)=>{
    try {
        console.log("Email received in sendOtp:", email); // ← add this
  
        if (!email) {
            throw new Error("Email is required");
        }
        const Otp=Math.floor(700000 + Math.random()*40000).toString();
        const expiry=Date.now()+5*60*1000;
        await brevo.transactionalEmails.sendTransacEmail({
        subject: "Welcome to API Task",
        textContent:`Dear User,

        Your One-Time Password (OTP) for verification is:

        ${Otp}

        This OTP is valid for 5 minutes only . Please do not share this code with anyone.
        
        Warm regards,
        API Task Team
`,
        sender: { name: "API Task", email: "myank07official@gmail.com" },
        to: [{ email: email }]
        })
        return {Otp,expiry};
    } catch (error) {
        console.log(error);
    }
} 