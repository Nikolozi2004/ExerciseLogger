import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"


export const NavBar = () => {

    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
    return (
        <header className="z-50 flex items-center justify-between px-4 py-2 backdrop-blur-sm bg-white/30">
            <Link to="/" className="text-2xl font-bold text-gray-800">
                <span className="text-blue-500">E</span>xercise<span className="text-blue-500">L</span>ogger
            </Link>
            <nav className="flex items-center">
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
                <button className="px-3 py-2" onClick={handleClick}>
                    Logout
                </button>
                <div className="ml-4 flex items-center bg-gray-200 rounded-full p-1">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-1">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    </div>
                </div>
            </nav>
        </header>
    )
}
