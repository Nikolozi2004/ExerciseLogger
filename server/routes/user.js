const express = require('express');

const router = express.Router();

const {
    loginUser,
    signUpUser
} = require('../controllers/userController')
// login
router.post('/login', loginUser);
// sign up
router.post('/signup', signUpUser);

module.exports = router;