import { useState } from "react";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    console.log(email, password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300 overflow-hidden relative">
      <Link to="/">
        <ArrowLeftCircleIcon className="size-10 absolute top-3 left-3 bg-white rounded-full hover:scale-110 hover:bg-black hover:fill-white" />
      </Link>
      <form
        className="flex flex-col justify-between items-center radial-gradient-background p-6 w-96 h-4/6 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg w-full text-center bg-slate-100 py-2 rounded-xl font-semibold">
          Login
        </h1>
        <div className="flex flex-col justify-between items-start w-full">

          <label className="font-semibold">Email:</label>
          <div className="relative w-full my-1 mb-5">
            <input
              className="w-full my-2 p-2 rounded-sm"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <EnvelopeIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-all size-6" />
          </div>

          <label className="font-semibold">Password:</label>
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
                <EyeIcon className="size-6" />
              ) : (
                <EyeSlashIcon className="size-6" />
              )}
            </button>
          </div>
        </div>
        <button className="bg-blue-400 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-200 hover:text-black transition-all">
          Login
        </button>
      </form>
    </div>
  );
};