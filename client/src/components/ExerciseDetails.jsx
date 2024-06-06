/* eslint-disable react/prop-types */
export const ExerciseDetails = ({ exercise, className }) => {
  return (
    <div className={`${className} bg-white border p-3 border-spacing-2`}>
      <h4>{exercise.title}</h4>
      {exercise.load === 0 ? null : <p>{exercise.load}</p>}
      <p>Reps: {exercise.reps}</p>
      <p>{exercise.createdAt}</p>
    </div>
  )
}