import Navbar from '../Navbar Component/Navbar';
import Input from '../Input Component/input';
import SideBar from '../Task Component/SideBar';
import Button from '../Landing Page Component/Button';
import Heading from '../Landing Page Component/Heading';
import {TaskInput, taskOptions } from './TaskProp';
import { useEffect, useState,useRef } from 'react';
import Options from './Options';
import Log from './Log Component/Log';
import Card from './Result Component/Card';
import axios from 'axios'
import Animation from '../Animation Component/Animations'

function Task(){
    const [TaskList,setTaskList]=useState(["ffv"]);
    const [options,setoptions]=useState(false);
    const [isHeading,setIsHeading]=useState(true);
    const [taskInput,setTaskInput]=useState({input:"",operation:"select operation"})
    const [logs,setlogs]=useState([]);
    const [result,setresult]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        console.log(logs)
    },[logs])
    
    const accessToken=()=>{
        const cookies = document.cookie.split("; ");
        const found = cookies.find((c) => c.startsWith("accessToken="));
        return found ? found.split("=")[1] : null;
    };

    const refershToken=()=>{
        const cookies = document.cookie.split("; ");
        const found = cookies.find((c) => c.startsWith("refreshToken="));
        return found ? found.split("=")[1] : null;
    };

    const intervalRef = useRef(null);
    const handleEnter=async(e)=>{
        if(e.key=="Enter"){
            setLoading(true);
            e.preventDefault();
            const input=e.target.value
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsHeading(false);
            try {
                    const res=await axios.post("http://localhost:3000/task",{input:input,operation:taskInput.operation},{headers:{
                    Authorization:`Bearer ${accessToken()}`
                }})
                    const taskId=res.data.taskId;
                    intervalRef.current=setInterval(async()=>{
                        const response=await axios.get(`http://localhost:3000/task/${taskId}`,{headers:{
                            Authorization:`Bearer ${accessToken()}`
                        }})
                        console.log(response.data.message.status);
                        //use nanimtioan
                        setlogs(response.data.message.logs);
                        setresult(response.data.message.result);
                        const lastStatus=response.data.message.logs[response.data.message.logs.length-1]
                        if(lastStatus.status=="completed"){
                            clearInterval(intervalRef.current)
                            setLoading(false)
                        }
                    },2000)
            } catch (error) {
                if(accessToken()==null){
                    const res = await axios.post("http://localhost:3000/auth/refresh", {
                        refreshToken: refershToken()
                    }); 
                    
                    document.cookie=`accessToken=${res.data.accessToken};path=/;max-age=${60*60}`;
                    const againRes=await axios.post("http://localhost:3000/task",{input:input,operation:taskInput.operation},{headers:{
                    Authorization:`Bearer ${accessToken()}`
                }})
                    const taskId=againRes.data.taskId;
                    intervalRef.current=setInterval(async()=>{
                        const response=await axios.get(`http://localhost:3000/task/${taskId}`,{headers:{
                                Authorization:`Bearer ${accessToken()}`
                        }})
                        
                        setlogs(response.data.message.logs);
                        setresult(response.data.message.result);

                        const lastStatus=response.data.message.logs[response.data.message.logs.length-1];
                        if(lastStatus.status=="completed"){
                                clearInterval(intervalRef.current)
                                setLoading(false)
                        }
                    },2000)
                }
            }
        }
    }

    const handleOptions=(index)=>{
        setTaskInput((prev)=>({
            ...prev,
            operation:taskOptions[index]
        }))
        setoptions(false)
    }

    const handleClick=()=>{
        setoptions(!options)
    }

    return(
        <>
        <Navbar />
        {isHeading?(
            <>
            <div className="flex flex-col ">
                <div className='flex flex-col justify-center items-center w-full text-center opacity-50' >
                    <Heading 
                    heading="What should we process today?"
                    subHeading="Enter any string of your choice, pick an operation such as uppercase, lowercase, reverse, or word count, and let the system handle the rest. Your task logs and final result will appear right here."
                    />
                </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-4 w-full px-7'  >
            <div className="w-full max-w-3xl ">
                <Input handleEnter={handleEnter} isbtn={false} Input={TaskInput} />
            </div>

            <div className='relative flex flex-col'>
                <div className="text-center py-8 space-x-6">
                <Button handleClick={handleClick} buttonText={taskInput.operation} />
                </div>

                {options?(
                    <div className='absolute top-27 flex flex-col'>
                        <Options handleoptionClick={handleOptions} TaskOptions={taskOptions}/>
                    </div>
                    ):null}
            </div>

            </div> 
            </>

        ):(
            <>
            <div className='w-full max-w-6xl'>

                {loading?(
                    <Animation />
                ):(
                    <Log Logs={logs} />
                )}
            </div>
            <div className='w-full max-w-6xl'>
                {loading?(
                    <Animation />
                ):(
                    <Card Result={result}/>
                )}
            </div>

            <div className='fixed bottom-10 left-10 right-0 flex flex-row justify-center items-center gap-4 w-full px-7'  >
            <div className="w-full max-w-3xl ">
                <Input handleEnter={handleEnter} isbtn={false} Input={TaskInput} />
            </div>

            <div className='relative flex flex-col'>
                <Button handleClick={handleClick} buttonText={taskInput.operation} />

                {options?(
                    <div className='absolute bottom-16 flex flex-col'>
                        <Options handleoptionClick={handleOptions} TaskOptions={taskOptions}/>
                    </div>
                    ):null}
            </div>

            </div> 
            </>
        )}
        </>
    )
}
export default Task;