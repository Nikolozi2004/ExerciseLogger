require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exerciseRoutes = require('./routes/exercises')
const userRoutes = require('./routes/user')
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/exercises', exerciseRoutes)
app.use('/api/user', userRoutes)
// db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });