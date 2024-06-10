import { createContext, useReducer } from "react";

export const ExerciseContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE":
            return {
                exercises: action.payload
            }
        case "CREATE_EXERCISE":
            return {
                exercises: [action.payload, ...state.exercises]
            }
        case "DELETE_EXERCISE":
            return {
                exercises: state.exercises.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export const ExerciseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exerciseReducer, {
        exercises: null
    })


    return (
        <ExerciseContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    )

}