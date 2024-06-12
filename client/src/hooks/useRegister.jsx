import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()

    const register = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post("http://localhost:4000/api/user/signup", {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({ type: "LOGIN", payload: response.data })
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError(err.response.data.error)
        }
    }

    return { register, isLoading, error }
}