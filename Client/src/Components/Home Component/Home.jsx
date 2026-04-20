import Heading from "../Landing Page Component/Heading";
import Button from '../Landing Page Component/Button';
import Task from "../Task Component/Task";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from "react";

function Home(){
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/auth/signup");
    }
    const [istoken,setistoken]=useState(true);
    return(
        <>
        <div className="dark flex flex-col items-center justify-center gap-12 bg-neutral-primary w-full h-screen">
            {istoken?(
                <Task />
            ):(
                <>
                <div className="flex flex-col justify-center items-center max-w-5xl">
                    <Heading 
                    heading="  Smarter Workflows, Faster Results  "
                    subHeading="Automating Everyday Workflows Through a Compact yet Powerful AI Processing Platform That Helps Individuals and Small Teams Work Smarter, Faster, and More Efficiently"
                />
                </div>
                <Button buttonText="Get Started" handleClick={handleClick} />
                </>
            )}
        </div>
        </>
    )
}
export default Home;