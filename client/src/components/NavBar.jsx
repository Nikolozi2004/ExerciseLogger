import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Fragment } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useDarkMode } from "../context/DarkModeContext"
export const NavBar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const handleClick = () => {
        logout()
    }
    
    return (
        <header className="z-50 flex items-center justify-between dark:bg-black px-4 py-2 backdrop-blur-sm bg-white/30 dark">
            <Link to="/" className="text-2xl font-bold text-gray-800">
                <span className="text-blue-500">E</span>xercise<span className="text-blue-500">L</span>ogger
            </Link>
            <nav className="flex items-center">
                {!user && (<Fragment>
                    <Link
                        to="/login"
                        className="px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-3 py-2 ml-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300"
                    >
                        Sign Up
                    </Link>
                </Fragment>)}
                {user && (<Fragment>
                    <button className="px-3 py-2" onClick={handleClick}>
                        Logout
                    </button>
                    <span>{user.email}</span>
                </Fragment>)}
                <div className="ml-4 flex items-center bg-gray-200 rounded-full p-1">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">

                        {isDarkMode ? <SunIcon className="size-6 cursor-pointer scale-105" onClick={toggleDarkMode} /> :
                            <MoonIcon className="size-6 cursor-pointer scale-105" onClick={toggleDarkMode} />}
                    </div>
                </div>
            </nav>
        </header>
    )
}
