import { useState } from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";
import axios from "axios";

export const ExerciseForm = () => {
    const { dispatch } = useExerciseContext()
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const exercise = {
            title,
            load,
            reps
        };

        try {
            const response = await axios.post('http://localhost:4000/api/exercises', exercise);
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
        <form className="w-1/4 flex flex-col justify-evenly items-center bg-white dark:bg-black  border h-96 rounded-md" onSubmit={handleSubmit}>
            <h3 className="text-lg">Add Exercises</h3>

            <label>Exercise Title:</label>
            <input 
            placeholder="Title"
            className={emptyFields.includes('title') ? "border-red-600 w-8/12 pl-2 border-2 rounded" : "w-8/12 pl-2 border-2 rounded border-black"}
            type="text" 
            onChange={(e) => setTitle(e.target.value)} value={title}/>

            <label>Exercise Load(kg):</label>
            <input 
            className={emptyFields.includes('load') ? "border-red-600 border-2 rounded text-center" : "text-center border-2 rounded border-black"}
            type="number" 
            onChange={(e) => setLoad(e.target.value)} value={load}/>

            <label>Exercise Reps:</label>
            <input 
            className={emptyFields.includes('reps') ? "border-red-600 border-2 rounded text-center" : "text-center border-2 rounded border-black"}
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps}/>

            <button className="border p-3 flex justify-center items-center bg-blue-600 text-white rounded-lg">Add Exercise</button>

            {error && <p>{error}</p>}
        </form>
    )
}