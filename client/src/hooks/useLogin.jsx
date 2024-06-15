import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post("https://exerciselogger.onrender.com/api/user/login", {
                email,
                password
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

    return { login, isLoading, error }
}