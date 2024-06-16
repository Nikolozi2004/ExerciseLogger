import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Fragment } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useDarkMode } from "../context/DarkModeContext"
import { useDeleteUser } from "../hooks/useDeleteUser"
export const NavBar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { deleteUser, isLoading, error } = useDeleteUser()
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const handleClick = () => {
        logout()
    }
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            await deleteUser()
        }
    }

    return (
        <header className="z-50 overflow-hidden flex items-center justify-between px-8 py-2 bg-slate-100 backdrop-blur-sm dark:bg-slate-900 transition-colors duration-500">
            <Link to="/" className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <span className="text-blue-500">E</span><span className="hidden md:inline">xercise</span><span className="text-blue-500">L</span><span className="hidden md:inline">ogger</span>
            </Link>
            <nav className="flex items-center">
                {!user && (<Fragment>
                    <Link
                        to="/login"
                        className="px-3 py-2 text-slate-800 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md transition-colors duration-500"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-3 py-2 ml-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-500"
                    >
                        Sign Up
                    </Link>
                </Fragment>)}
                <div>
                    {user.username}
                </div>
                <div>
                    <button onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete Account'}
                    </button>
                    {error && <div className="error">{error}</div>}
                </div>
                {user && (<Fragment>
                    <button className="px-3 py-2 bg-red-300 hover:bg-red-500 transition-all hover:text-white text-slate-100 rounded-lg dark:text-slate-200 mr-2" onClick={handleClick}>
                        Logout
                    </button>
                    <span className="text-slate-800 dark:text-slate-200 underline">{user.email}</span>
                </Fragment>)}
                <div className="ml-4 flex items-center bg-gray-200 dark:bg-slate-700 rounded-full p-1">
                    <div onClick={toggleDarkMode} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                        {isDarkMode ?
                            <SunIcon className="size-7 hover:scale-110 fill-yellow-500 cursor-pointer text-slate-800 dark:text-slate-200" /> :
                            <MoonIcon className="size-7 cursor-pointer hover:scale-110 fill-slate-500 text-slate-800 dark:text-slate-200" />
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}
