import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const register = async (email, password, username) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post("https://exerciselogger.onrender.com/api/user/signup", {
                email,
                password,
                username
            });

            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({ type: "LOGIN", payload: response.data })
            setIsLoading(false)
            navigate('/')
        } catch (err) {
            setIsLoading(false)
            setError(err.response.data.error)
        }
    }

    return { register, isLoading, error }
}