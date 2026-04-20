function Navbar(){
    return(
        <>
        <nav class="dark bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default">
        <div class="max-w-7xl flex flex-wrap items-center justify-between p-8">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo" />
                <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">AI Task</span>
            </a>
        </div>
        </nav>
        </>
    )
}
export default Navbar;