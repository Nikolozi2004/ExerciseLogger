import { useState } from "react"
import axios from "axios"
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { TrashIcon, PencilIcon, CheckIcon, ScaleIcon, ArrowPathIcon } from "@heroicons/react/24/solid"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const ExerciseDetails = ({ exercise, className }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(exercise.title)
  const [load, setLoad] = useState(exercise.load)
  const [reps, setReps] = useState(exercise.reps)
  const { dispatch } = useExerciseContext()
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (!user) {
      return
    }
    try {
      const response = await axios.delete(`https://exerciselogger.onrender.com/api/exercises/${exercise._id}`, {
        headers: { "Authorization": `Bearer ${user.token}` }
      })
      dispatch({ type: "DELETE_EXERCISE", payload: response.data })
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleUpdate = async () => {
    if (!user) {
      return
    }
    try {
      const response = await axios.patch(
        `https://exerciselogger.onrender.com/api/exercises/${exercise._id}`,
        { title, load, reps },
        { headers: { "Authorization": `Bearer ${user.token}` } }
      )
      dispatch({ type: "PATCH_EXERCISE", payload: response.data })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  }

  return (
    <div className={`${className} transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg h-52 overflow-hidden rounded-lg py-5 px-2 md:p-5 relative`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-1 border rounded text-black"
            min="0"
            max="999"
          />
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className="w-full mb-2 p-1 border rounded text-black"
            min="0"
            max="999"
          />
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full mb-2 p-1 border rounded text-black"
            min="0"
            max="999"
          />
          <button
            onClick={handleUpdate}
            className="p-2 rounded-full absolute right-3 bottom-3 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 transition-colors duration-300"
            aria-label="Save exercise"
          >
            <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
          </button>
        </>
      ) : (
        <>
          <h4 className="text-xl font-semibold mb-3 w-full pb-1 text-center break-words">{exercise.title}</h4>
          <p className="mb-1 flex items-center">
            <ScaleIcon className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
            Load: <span className="font-medium ml-1">{exercise.load} kg</span>
          </p>
          <p className="mb-1 flex items-center">
            <ArrowPathIcon className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
            Reps: <span className="font-medium ml-1">{exercise.reps}</span>
          </p>
          <div className="flex justify-between absolute bottom-5 left-3 items-center text-sm text-slate-500 dark:text-slate-400">
            <p>{formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}</p>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full absolute right-3 bottom-3 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-300"
            aria-label="Delete exercise"
          >
            <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
          </button>
          <button
            onClick={handleEdit}
            className="p-2 rounded-full absolute right-3 bottom-10 md:right-12 md:bottom-3 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            aria-label="Edit exercise"
          >
            <PencilIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </button>
        </>
      )}
    </div>
  )
}