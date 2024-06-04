import { Fragment, useEffect, useState } from "react"
import axios from "axios";
import { ExerciseDetails } from "../components/ExerciseDetails";

export const Home = () => {

    const [exercises, setExercises] = useState(null)
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/exercises');
                setExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, []);
    return (
        <div className="mt-20">
            {exercises && exercises.map((exercise, index) => (
                <ExerciseDetails key={index} exercise={exercise}/>
            ))}
        </div>
    )

}
