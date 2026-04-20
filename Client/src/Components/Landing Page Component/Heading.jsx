function Heading({heading,subHeading}){
    return (
        <>
            <h1 class="mb-4 text-center text-3xl font-bold md:text-5xl lg:text-6xl text-violet-400 bg-clip-text" >{heading}</h1>
            <p class="text-lg max-w-4xl md:text-xl text-center font-normal text-body">{subHeading}</p>
        </>
    )
}

export default Heading;