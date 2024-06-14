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
    <div className={`${className} transition-colors flex flex-col duration-500 bg-white dark:text-slate-200 dark:bg-slate-700 border-slate-900 border p-3 border-spacing-2 rounded relative`}>
      <h4 className="underline underline-offset-2 underline">{exercise.title}</h4>
      {exercise.load === 0 ? null : <p>Load:{exercise.load}</p>}
      <p>Reps: {exercise.reps}</p>
      <div className="flex w-full justify-between">
        <p>{formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}</p>
        <span className="cursor-pointer absolute bottom-3 right-3" onClick={handleClick}><TrashIcon className="size-6 dark:fill-red-400 fill-blue-500 hover:scale-110" /></span>
      </div>

    </div>
  )
}