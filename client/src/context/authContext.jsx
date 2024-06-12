import { createContext, useReducer } from "react";

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        case "default":
            return state
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('authContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}