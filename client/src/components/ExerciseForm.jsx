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

    const handleTitleChange = (e) => {
        const value = e.target.value.slice(0, 90);
        setTitle(value);
    }

    const handleNumberChange = (e, setter) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 999)) {
            setter(value);
        }
    }

    return (
        <form
            className="md:w-1/3 mx-auto h-fit p-6 flex flex-col space-y-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-lg rounded-lg transition-colors duration-500"
            onSubmit={handleSubmit}
        >
            <h3 className="text-2xl font-semibold text-center text-slate-800 dark:text-white mb-4">Add Exercise</h3>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exercise Title:</label>
                <input
                    placeholder="Enter exercise title (max 90 characters)"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${emptyFields.includes('title')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600'
                        }`}
                    type="text"
                    onChange={handleTitleChange}
                    value={title}
                    maxLength={90}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exercise Load (kg):</label>
                <input
                    placeholder="Enter Load (Max 999)"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${emptyFields.includes('load')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600'
                        }`}
                    type="number"
                    onChange={(e) => handleNumberChange(e, setLoad)}
                    value={load}
                    min="0"
                    max="999"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exercise Reps:</label>
                <input
                    placeholder="Enter Reps (Max 999)"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${emptyFields.includes('reps')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600'
                        }`}
                    type="number"
                    onChange={(e) => handleNumberChange(e, setReps)}
                    value={reps}
                    min="0"
                    max="999"
                />
            </div>

            <button
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Exercise
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
    )
}