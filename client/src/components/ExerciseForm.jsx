import { useState } from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const ExerciseForm = () => {
    const { user } = useAuthContext()
    const { dispatch } = useExerciseContext()
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
        }
        const exercise = {
            title,
            load,
            reps
        };

        try {
            const response = await axios.post('http://localhost:4000/api/exercises', exercise, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            setError(null);
            setTitle("");
            setLoad("");
            setReps("");
            setEmptyFields([])
            dispatch({ type: "CREATE_EXERCISE", payload: response.data })
        } catch (err) {
            setError(err.response.data.error);
            setEmptyFields(err.response.data.emptyFields)
        }
    }

    return (
        <form className="md:w-1/4 md:ml-0 ml-3 flex flex-col justify-evenly items-center bg-white dark:bg-slate-700 border-slate-800 dark:text-white  border h-96 rounded-md transition-colors duration-500" onSubmit={handleSubmit}>
            <h3 className="text-lg">Add Exercises</h3>

            <label>Exercise Title:</label>
            <input
                placeholder="Title"
                className={emptyFields.includes('title') ?
                    "border-red-600 lg:w-10/12 pl-2 border-2 rounded w-full dark:text-black" :
                    "lg:w-10/12 pl-2 border-2 rounded border-black w-full dark:text-black"}
                type="text"
                onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Exercise Load(kg):</label>
            <input
                className={emptyFields.includes('load') ?
                    "border-red-600 border-2 rounded text-center w-full md:w-1/2 dark:text-black" :
                    "text-center border-2 rounded border-black w-full md:w-1/2 dark:text-black"}
                type="number"
                onChange={(e) => setLoad(e.target.value)} value={load} />

            <label>Exercise Reps:</label>
            <input
                className={emptyFields.includes('reps') ?
                    "border-red-600 border-2 rounded text-center w-full md:w-1/2 dark:text-black" :
                    "text-center border-2 rounded border-black w-full md:w-1/2 dark:text-black"}
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps} />

            <button className="border hover:bg-green-500 dark:hover:bg-green-800 dark:border-slate-800 transition-colors duration-500 py-2 px-3 flex justify-center items-center bg-green-600 text-white rounded-lg">Add Exercise</button>

            {error && <p className="text-red-400 underline-offset-1 underline">{error}</p>}
        </form>
    )
}