export const ExerciseDetails = ({ exercise }) => {
  return (
    <div>
        <h4>{exercise.title}</h4>
        {exercise.load === 0 ? null : <p>{exercise.load}</p>}
        <p>Reps: {exercise.reps}</p>
        <p>{exercise.createdAt}</p>
    </div>
  )
}
