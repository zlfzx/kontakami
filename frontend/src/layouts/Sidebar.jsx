import { NavLink } from "react-router-dom";

export default function Sidebar() {

    let classLink = "flex items-center justify-start w-full p-2 pl-6 my-2 "
    const classActive = "text-gray-800 transition-colors duration-200 border-l-4 border-blue-500 dark:text-white"
    const classPending = "text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"

    const styleLink = ({ isActive, isPending }) => {
        if (isActive) {
            return classLink + classActive
        } else {
            return classLink + classPending
        }
    }

    return (
        <div className="relative hidden h-screen shadow-lg lg:block w-80">
            <div className="h-full bg-white dark:bg-gray-700">
                <div className="flex items-center justify-start pt-6 ml-8">
                    <p className="text-xl font-bold dark:text-white">
                        KontaKami
                    </p>
                </div>
                <nav className="mt-6">
                    <div>
                        <NavLink to={`/`} className={styleLink}>
                            <span className="text-left">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z">
                                    </path>
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink to={`chat`} className={styleLink}>
                            <span className="text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
                                    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">
                                Conversation
                                <span className="w-4 h-2 p-1 ml-4 text-xs text-gray-400 bg-gray-200 rounded-lg">
                                    0
                                </span>
                            </span>
                        </NavLink>
                        <NavLink to={`command`} className={styleLink}>
                            <span className="text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-command" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10"></path>
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">
                                Command
                            </span>
                        </NavLink>
                        <NavLink to={'setting'} className={styleLink}>
                            <span className="text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                </svg>
                            </span>
                            <span className="mx-2 text-sm font-normal">
                                Setting
                            </span>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </div>
    )
}