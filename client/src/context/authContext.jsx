import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload, isLoading: false }
        case "LOGOUT":
            return { user: null, isLoading: false }
        case "LOADED":
            return { ...state, isLoading: false }
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoading: true
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
        dispatch({ type: "LOADED" })
    }, [])

    console.log('authContext state: ', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}