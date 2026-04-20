function Card({Result}){
    return(
        <>
        <div class="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-heading">Result</h5>
            <p class="mb-3 text-body">{Result}</p>
        </div>
        </>
    )
}
export default Card;