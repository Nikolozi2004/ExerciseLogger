import { useAuthContext } from "./useAuthContext"
import { useExerciseContext } from "./useExerciseContext"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: exercisesDispatch } = useExerciseContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" })
        exercisesDispatch({type: "SET_EXERCISE", payload: null})
    }
    return { logout }
}
