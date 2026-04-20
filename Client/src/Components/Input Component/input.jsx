import { useForm } from "react-hook-form";
import Button from "../Landing Page Component/Button";
import { useSearchParams } from "react-router-dom";
import { useState, useSyncExternalStore } from "react";

function Input({Input,onsubmit,isbtn,handleEnter}){
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm()
    return(
        <>
        <form class="w-full">
            <div class="relative w-full ">

            {Input.map((input,index)=>(
                <>
                <div className="my-4 w-full">
                <input key={index} type={input.type} id="input-group-1" class="block w-full px-8 py-4 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder={input.placeholder} {...register(input.name,input.validation)} onKeyDown={handleEnter} />
                </div>
                {errors[input.name] && <span className="text-sm text-red-700 px-8">{input.errorMessage}</span> }
                </>
            ))}
            </div>

            {isbtn?(
                <div className="text-center py-8">
                <Button buttonText="Get OTP" handleClick={handleSubmit(onsubmit)}/>
                </div>
            ):null}
        </form>
        </>
    )
}
export default Input;