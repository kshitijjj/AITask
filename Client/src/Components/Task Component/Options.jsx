function Options({TaskOptions,handleoptionClick}){
    return(
        <>
        <div class="z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-56">
            <ul class="p-2 text-sm text-body font-medium">
            {TaskOptions.map((options,index)=>(
                    <li onClick={()=>handleoptionClick(index)} key={index}>
                        <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">{options}</a>
                    </li>
                ))}   
            </ul>
        </div>
        </>
    )
}
export default Options;