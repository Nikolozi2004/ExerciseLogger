import { useEffect } from "react"
import axios from "axios";
import { ExerciseDetails } from "../components/ExerciseDetails";
import { ExerciseForm } from "../components/ExerciseForm";
import { useExerciseContext } from "../hooks/useExerciseContext";
export const Home = () => {

    const {exercises, dispatch} = useExerciseContext()

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/exercises');
                dispatch({type: "SET_EXERCISE", payload: response.data});
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, []);

    return (
        <div className="flex">
            <div className="parent grid grid-cols-2 grid-rows-2 gap-2 w-2/3">
                {exercises && exercises.map((exercise, index) => {
                    const gridClass = `div${index + 1} col-span-1 row-span-1`;
                    return <ExerciseDetails key={index} exercise={exercise} className={gridClass} />
                })}
            </div>
            <ExerciseForm />
        </div>
    )
}