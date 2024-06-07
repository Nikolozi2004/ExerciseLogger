import { ExerciseContext } from "../context/ExerciseContext";
import { useContext } from "react";

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext)

    if (!context) {
        throw Error("useExerciseContext is not inside ExerciseContextProvider")
    }

    return context
}