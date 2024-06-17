import { useState } from "react"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon, SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/solid"
import { Link, useNavigate } from "react-router-dom"
import { useRegister } from "../hooks/useRegister"
import { useDarkMode } from "../context/DarkModeContext"
import { useAuthContext } from "../hooks/useAuthContext"
export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { register, error, isLoading } = useRegister()
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if(user){
    navigate('/')
  }
  const handleReload = () => {
    navigate('/');
    window.location.reload();
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(email, password, username)
  }

  return (
    <div className="w-full h-[700px] md:h-screen flex justify-center items-center md:items-center bg-slate-300 dark:bg-slate-900 overflow-auto md:overflow-hidden relative transition-colors duration-500">
      <div className="animate-fadeIn w-full h-full flex justify-center items-center">
        <button onClick={handleReload}>
          <ArrowPathIcon className="size-10 z-20 absolute top-3 left-3 bg-white rounded-full hover:scale-110 hover:bg-black hover:fill-white" />
        </button>
        <div className="ml-4 z-20 flex items-center absolute top-3 left-10 bg-gray-200 rounded-full p-1" onClick={toggleDarkMode}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {isDarkMode ?
              <SunIcon className="size-7 hover:scale-110 fill-yellow-500 cursor-pointer text-slate-800 dark:text-slate-200" /> :
              <MoonIcon className="size-7 cursor-pointer hover:scale-110 fill-slate-500 text-slate-800 dark:text-slate-200" />
            }
          </div>
        </div>
        <form className="flex scale-100 flex-col justify-between items-center dark:bg-slate-800 bg-slate-200 p-6 w-96 h-[600px] rounded-md transition-colors duration-500"
          onSubmit={handleSubmit}>
            
          <h1 className="text-lg w-full text-center bg-slate-100 dark:bg-slate-600 dark:text-slate-50 py-2 rounded-xl font-semibold">
            Sign Up
          </h1>
          <div className="flex flex-col justify-between items-start w-full">
          <label className="font-semibold dark:text-white">Username:</label>
            <div className="relative w-full my-1 mb-4">
              <input
                className="w-full my-2 p-2 rounded-sm"
                placeholder="Username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
              />
              <UserIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-all size-6 fill-blue-400" />
            </div>
            <label className="font-semibold dark:text-white">Email:</label>
            <div className="relative w-full my-1 mb-4">
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
          <Link to="/login" className="text-blue-500 hover:text-blue-400">Already have an account?</Link>
          <button disabled={isLoading} className="bg-blue-400 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-200 hover:text-black transition-all">
            {isLoading ? <div className="spinner border-4 border-t-4 border-white border-opacity-25 border-t-white rounded-full w-4 h-4"></div> : <p>Sign Up</p>}
          </button>
        </form>
      </div>
    </div>
  )
}
