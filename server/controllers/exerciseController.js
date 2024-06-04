const mongoose = require('mongoose');
const Exercise = require('../models/exerciseModel');

// get all Exercises
const getExercises = async (req, res) => {
    const Exercises = await Exercise.find({}).sort({ createdAt: -1 });
    res.status(200).json(Exercises);
};

// get a single Exercise
const getExercise = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    const exercise = await Exercise.findById(id);
    if (!exercise) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    res.status(200).json(exercise);
};

// create new Exercise
const createExercise = async (req, res) => {
    const { title, load, reps } = req.body;
    try {
        const exercise = await Exercise.create({ title, load, reps });
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a Exercise
const deleteExercise = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    const exercise = await Exercise.findOneAndDelete({ _id: id });
    if (!exercise) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    res.status(200).json(exercise);
};

// update a Exercise
const updateExercise = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    const exercise = await Exercise.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!exercise) {
        return res.status(404).json({ error: 'Exercise Not Found' });
    }
    res.status(200).json(exercise);
};

module.exports = {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise,
};