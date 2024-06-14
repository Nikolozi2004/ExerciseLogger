const Exercise = require('../models/exerciseModel');
const mongoose = require('mongoose');


// get all Exercises
const getExercises = async (req, res) => {

    const user_id = req.user._id
    const Exercises = await Exercise.find({ user_id }).sort({ createdAt: -1 });
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

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields })
    }

    try {
        const user_id = req.user._id
        const exercise = await Exercise.create({ title, load, reps, user_id });
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
