import Navbar from "../Navbar Component/Navbar";
import Heading from "../Landing Page Component/Heading";
import Input from '../Input Component/input';
import { emailInput } from "./AuthProp";
import { useState } from "react";
import InputNumber from "../Input Component/inputNumber";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";

function Auth(){
    const [isclick,setisclick]=useState(false);
    const [otp,setotp]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const navigate=useNavigate();

    const handleSubmit=async(data)=>{
        try {
            await axios.post("http://localhost:3000/auth/signup",data);
            setUserEmail(data['email']);
            setisclick(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleotp=async()=>{
        try {
            const response=await axios.post("http://localhost:3000/auth/otp-authentication",{email:userEmail,otp});
            if(response.status===201){
                const {accessToken,refreshToken}=response.data;
                document.cookie=`accessToken=${accessToken};path=/;max-age=${60*60}`;
                document.cookie=`refreshToken=${refreshToken};path=/;max-age=${60*60*24*7}`;
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange=(e,index)=>{
        if(e.target.value.length==1){
            const next=document.getElementById(`otp-${index+1}`);
            if(next)next.focus();
        }
        setotp((prev)=>prev+e.target.value)
    }

    return(
        <>
        <Navbar />
        <div className=" dark w-full h-screen bg-neutral-primary flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center max-w-5xl">
                <Heading 
                heading="  Think Less. Automate More  "
                subHeading="Automating Everyday Workflows Through a Compact yet Powerful AI Processing Platform That Helps Individuals and Small Teams Work Smarter, Faster, and More Efficiently"
            />
                </div>

               
                {!isclick?(
                     <div className="my-8 max-w-5xl">
                        <Input onsubmit={handleSubmit} Input={emailInput}/> 
                    </div>
                ):(
                     <div className="my-8 w-full max-w-xl flex flex-col items-center justify-center">
                    <InputNumber handleChange={handleChange} handleotp={handleotp}/>
                    </div>
                )}
                
        </div>
        </>
    )
}

export default Auth;