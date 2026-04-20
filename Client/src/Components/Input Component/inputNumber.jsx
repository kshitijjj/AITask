import Button from "../Landing Page Component/Button";

function InputNumber({handleotp,handleChange}){
    const handleKey=(e,index)=>{
        if(e.key=="Backspace" && !e.target.value){
            const next=document.getElementById(`otp-${index-1}`);
            if(next)next.focus();
        }
    }
    return(
        <>
        <form  className="flex flex-col justify-center items-center gap-2 w-sm ">

            <div className="flex flex-row gap-4">
                {[...Array(6)].map((_,index)=>(
                <input maxLength={1} onKeyDown={(e)=>handleKey(e,index)} inputMode="numeric" key={index} type="text" id={`otp-${index}`} onChange={(e)=>handleChange(e,index)} aria-describedby="helper-text-explanation" class="text-center block max-w-13 px-3 py-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="0"  />
                ))}
            </div>

                <div className="text-center py-8">
                    <Button buttonType="button" buttonText="Submit" handleClick={handleotp}/>
                </div>

        </form>
        </>
    )
}

export default InputNumber