function Button({buttonText,handleClick,buttonType}){
    return(
        <>
        <button type={buttonType} onClick={handleClick} class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-md font-medium text-heading rounded-base group bg-violet-100 hover:text-violet-400 hover:font-bold">
            <span class=" relative px-12 py-4 transition-all ease-in duration-100 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                {buttonText}
            </span>
        </button>
        </>
    )
}
export default Button;