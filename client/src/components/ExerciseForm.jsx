import { useState } from "react";
import axios from "axios";
export const ExerciseForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

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
            console.log('added', response.data);
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    return (
        <form className="w-1/3 flex flex-col justify-center items-center text-white" onSubmit={handleSubmit}>
            <h3>Add new exercises</h3>
            <label>Exercise Title:</label>
            <input className="text-black" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            <label>Exercise Load(kg):</label>
            <input className="text-black" type="number" onChange={(e) => setLoad(e.target.value)} value={load} />
            <label>Exercise Reps:</label>
            <input className="text-black" type="number" onChange={(e) => setReps(e.target.value)} value={reps} />
            <button>Add Exercise</button>
            {error && <p>{error}</p>}
        </form>
    )
}