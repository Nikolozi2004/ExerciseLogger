import axios from "axios"
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { TrashIcon } from "@heroicons/react/24/solid"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
/* eslint-disable react/prop-types */
export const ExerciseDetails = ({ exercise, className }) => {

  const { dispatch } = useExerciseContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await axios.delete(`http://localhost:4000/api/exercises/${exercise._id}`, {
      headers: { "Authorization": `Bearer ${user.token}` }
    })
    try {
      dispatch({ type: "DELETE_EXERCISE", payload: response.data })
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }

  return (
    <div className={`${className} transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg rounded-lg p-5 relative`}>
      <h4 className="text-xl font-semibold mb-3">{exercise.title}</h4>

      <div className="space-y-2 mb-4">
        {exercise.load !== 0 && (
          <p className="flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
            Load: <span className="font-medium">{exercise.load} kg</span>
          </p>
        )}
        <p className="flex items-center">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </span>
          Reps: <span className="font-medium">{exercise.reps}</span>
        </p>
      </div>

      <div className="flex justify-between absolute bottom-5 left-3 items-center text-sm text-slate-500 dark:text-slate-400">
        <p>{formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}</p>
      </div>
      <button
          onClick={handleClick}
          className="p-2 rounded-full absolute right-3 bottom-3 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-300"
          aria-label="Delete exercise"
        >
          <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
        </button>
    </div>
  )
}