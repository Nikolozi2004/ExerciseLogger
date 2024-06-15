import { useState } from "react";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useDarkMode } from "../context/DarkModeContext"
import { useAuthContext } from "../hooks/useAuthContext";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  

  if (user) {
    navigate('/')
  }
  const handleReload = () => {
    navigate('/');
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300 dark:bg-slate-900 overflow-hidden relative transition-colors duration-500">
      <div className="animate-fadeIn w-full h-full flex justify-center items-center">
        <button onClick={handleReload}>
          <ArrowPathIcon className="size-10 absolute top-3 left-3 bg-white rounded-full hover:scale-110 hover:bg-black hover:fill-white" />
        </button>
        <div className="ml-4 flex items-center absolute top-3 left-10 bg-slate-500 hover:scale-110 cursor-pointer rounded-full p-1" onClick={toggleDarkMode}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {isDarkMode ?
              <SunIcon className="size-7 hover:scale-110 fill-yellow-500 text-slate-800 dark:text-slate-200" /> :
              <MoonIcon className="size-7 hover:scale-110 fill-slate-500 text-slate-800 dark:text-slate-200" />
            }
          </div>
        </div>
        <form
          className="flex flex-col justify-between items-center dark:bg-slate-800 bg-slate-200 p-6 w-96 h-5/6 md:h-4/6 rounded-md transition-colors duration-500"
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg w-full text-center bg-slate-100 dark:bg-slate-600 dark:text-slate-50 py-2 rounded-xl font-semibold">
            Login
          </h1>
          <div className="flex flex-col justify-between items-start w-full">

            <label className="font-semibold dark:text-white">Email:</label>
            <div className="relative w-full my-1 mb-5">
              <input
                className="w-full my-2 p-2 rounded-sm"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <EnvelopeIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-all size-6 fill-blue-400" />
            </div>

            <label className="font-semibold dark:text-white">Password:</label>
            <div className="relative w-full my-1">
              <input
                autoComplete="current-password"
                className="w-full my-2 p-2 rounded-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-all"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <EyeIcon className="size-6 hover:scale-105 fill-blue-500 hover:fill-red-500" />
                ) : (
                  <EyeSlashIcon className="size-6 hover:scale-105 fill-red-500 hover:fill-blue-500" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-100 border py-2 px-4 border-red-700 rounded-sm bg-red-400">{error}</p>}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">Don't have an account?</Link>
          <button disabled={isLoading} className="bg-blue-400 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-200 hover:text-black transition-all">
            {isLoading ? <div className="spinner border-4 border-t-4 border-white border-opacity-25 border-t-white rounded-full w-4 h-4"></div> : <p>Login</p>}
          </button>
        </form>
      </div>
    </div>
  );
};