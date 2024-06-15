import axios from "axios"
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { TrashIcon, PlusIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
/* eslint-disable react/prop-types */
export const ExerciseDetails = ({ exercise, className }) => {

  const { dispatch } = useExerciseContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await axios.delete(`https://exerciselogger.onrender.com/api/exercises/${exercise._id}`, {
      headers: { "Authorization": `Bearer ${user.token}` }
    })
    try {
      dispatch({ type: "DELETE_EXERCISE", payload: response.data })
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }

  return (
    <div className={`${className} transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg rounded-lg py-5 px-2 md:p-5 relative`}>
      <h4 className="text-xl font-semibold mb-3 w-full text-center underline">{exercise.title}</h4>

      <div className="space-y-2 mb-4">
        {exercise.load !== 0 && (
          <p className="flex items-center">
            <span className="mr-2">
              <PlusIcon className="size-5 fill-blue-500"/>
            </span>Load: <span className="font-medium ml-1">{exercise.load} kg</span>
          </p>
        )}
        <p className="flex items-center">
        <span className="mr-2">
              <ArrowRightCircleIcon className="size-5 fill-green-500"/>
            </span>
          Reps: <span className="font-medium ml-1">{exercise.reps}</span>
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