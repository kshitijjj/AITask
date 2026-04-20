function Log({Logs}){
    if(!Logs || Logs.length === 0) return null;
    return(
        <>
        <ol class="relative border-s border-default">   
            {Logs.map((logs,index)=>(
                <li key={index} class="mb-10 ms-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg class="w-3 h-3 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
                    </span>
                    <div class="items-center justify-between p-4 bg-neutral-primary-soft border border-default rounded-base shadow-xs sm:flex">
                        <p class="text-base font-normal text-body">{new Date(logs.timeStamp).toLocaleString()}</p>
                         <h3 class="text-lg font-semibold text-heading my-2">{logs.message}</h3>
                        <time class="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-8 py-3 rounded sm:order-last mb-1 sm:mb-0">{logs.status}</time>
                    </div>
                </li>
            ))}               
        </ol>
        </>
    )
}
export default Log;