import { useEffect, useState } from "react"
import axios from "axios";
import { ExerciseDetails } from "../components/ExerciseDetails";
import { ExerciseForm } from "../components/ExerciseForm";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
    const { exercises, dispatch } = useExerciseContext()
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
    const fetchExercises = async () => {
        if (dataFetched) return;
        setLoading(true);
        setShowNotification(true);
        try {
            const response = await axios.get('http://localhost:4000/api/exercises', {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            dispatch({ type: "SET_EXERCISE", payload: response.data });
            setDataFetched(true);
            // console.log(response.data)
            // console.log(dataFetched)
        } catch (error) {
            console.error('Error fetching exercises:', error);
        } finally {
            setLoading(false);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };
    if (user && !dataFetched) {
        fetchExercises();
    }
}, [dispatch, user, dataFetched]);

    return (
        <div className="flex flex-row-reverse justify-between gap-1 md:gap-3 relative">
            <div className="parent grid grid-cols-1 grid-rows-2 gap-3 w-2/3 md:grid-cols-2 overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col justify-center items-center col-span-full row-span-full">
                        <div className="loader"></div>
                        {showNotification && (
                            <div className="bg-blue-500 text-white p-2 text-center mt-4">
                                Data is being fetched. This might take a moment...
                            </div>
                        )}
                    </div>
                ) : (
                    exercises && exercises.map((exercise, index) => {
                        const gridClass = `div${index + 1} col-span-1 row-span-1`;
                        return <ExerciseDetails key={index} exercise={exercise} className={gridClass} />
                    })
                )}
            </div>
            <ExerciseForm />
        </div>
    )
}