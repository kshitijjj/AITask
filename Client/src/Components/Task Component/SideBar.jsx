function SideBar({TaskList}){
    return(
        <>
        <aside class="dark bg-neutral-primary fixed top-24 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-6 py-12 overflow-y-auto bg-neutral-primary border-e border-default">
                <ul class="space-y-2 font-medium">
                    {TaskList.map((task,index)=>(
                        <li className="py-2" key={index}>
                        <a  href="#" class="flex items-center px-6 py-4 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                        <span class="ms-3">{task}</span>
                        </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
        </>
    )
}
export default SideBar;