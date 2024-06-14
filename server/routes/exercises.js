const express = require('express');
const {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise,
} = require("../controllers/exerciseController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)
// GET all Exercises
router.get('/', getExercises);

// GET a single Exercise
router.get('/:id', getExercise);

// POST a new Exercise
router.post('/', createExercise);

// DELETE a Exercise
router.delete('/:id', deleteExercise)

// UPDATE a Exercise
router.patch('/:id', updateExercise)

module.exports = router;