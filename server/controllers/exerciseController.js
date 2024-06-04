const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// get all Exercises
const getExercises = async (req, res) => {
    const Exercises = await Exercise.find({}).sort({ createdAt: -1 })

    res.status(200).json(Exercises)
}


// get a single Exercise
const getExercise = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Exercise' })
    }
    const Exercise = await Exercise.findById(id)
    if (!Exercise) {
        return res.status(404).json({ error: 'No such Exercise' })
    }

    res.status(200).json(Exercise)
}


// create new Exercise
const createExercise = async (req, res) => {
    const { title, load, reps } = req.body
    try {
        const Exercise = await Exercise.create({ title, load, reps });
        res.status(200).json(Exercise)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// delete a Exercise
const deleteExercise = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Exercise' })
    }

    const Exercise = await Exercise.findOneAndDelete({ _id: id })

    if (!Exercise) {
        return res.status(404).json({ error: 'No such Exercise' })
    }

    res.status(200).json(Exercise)
}


// update a Exercise
const updateExercise = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Exercise' })
    }

    const Exercise = await Exercise.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!Exercise) {
        return res.status(404).json({ error: 'No such Exercise' })
    }

    res.status(200).json(Exercise)

}


module.exports = {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise,
}