import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Fragment, useEffect, useRef } from "react";
import { SunIcon, MoonIcon, UserCircleIcon, Cog8ToothIcon, UserIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "../context/DarkModeContext";
import { useState } from "react";

export const NavBar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isDropped, setIsDropped] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const dropdownRef = useRef(null);
    const handleClick = () => {
        logout();
    };
    const handleAccMenu = () => {
        setIsDropped(!isDropped);
        setIsRotated(!isRotated);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropped(false);
                setIsRotated(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="z-50 overflow-visible flex items-center justify-between px-8 py-2 bg-slate-100 backdrop-blur-sm dark:bg-slate-900 transition-colors duration-500">
            <Link to="/" className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <span className="text-blue-500">E</span><span className="md:inline text-slate-700 dark:text-slate-200">xercise</span><span className="text-blue-500">L</span><span className="scale-90 sm:scale-100 text-slate-700 dark:text-slate-200">ogger</span>
            </Link>
            <nav className="flex justify-end items-center gap-5">
                {user && (<Fragment>
                    <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-blue-500 text-white">
                        <span className="font-semibold">{user.username}</span>
                        <UserCircleIcon className="w-6 h-6" />

                    </div>
                </Fragment>)}
                <div className="ml-4 flex items-center bg-gray-200 dark:bg-slate-700 rounded-full p-1">
                    <div onClick={toggleDarkMode} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                        {isDarkMode ?
                            <SunIcon className="size-7 hover:scale-110 fill-yellow-500 cursor-pointer text-slate-800 dark:text-slate-200" /> :
                            <MoonIcon className="size-7 cursor-pointer hover:scale-110 fill-slate-500 text-slate-800 dark:text-slate-200" />
                        }
                    </div>
                </div>
                <div className="relative" ref={dropdownRef}>
                    <Cog8ToothIcon
                        onClick={handleAccMenu}
                        className={`dark:fill-slate-200 size-8 cursor-pointer transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`}
                    />
                    {isDropped ? (
                        <div className="animate-fadeIn absolute bottom-[-108px] right-[-20px] z-50 bg-white dark:bg-slate-800 rounded-md shadow-md p-2">
                            <Link to="/account" className="flex items-center gap-2 p-2 hover:bg-blue-200 dark:hover:bg-blue-500 rounded-md">
                                <UserIcon className="w-5 h-5 text-slate-500" />
                                <span className="text-slate-800 dark:text-slate-200">Profile</span>
                            </Link>
                            <div
                                className="flex items-center gap-2 p-2 hover:bg-red-200 dark:hover:bg-red-500 rounded-md cursor-pointer"
                                onClick={handleClick}
                            >
                                <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-slate-500" />
                                <span className="text-slate-800 dark:text-slate-200">Logout</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </nav>
        </header>
    );
};