const express = require('express');

const router = express.Router();

const {
    loginUser,
    signUpUser,
    deleteUser
} = require('../controllers/userController')
// login
router.post('/login', loginUser);
// sign up
router.post('/signup', signUpUser);
// delete user
router.delete('/:id', deleteUser);

module.exports = router;