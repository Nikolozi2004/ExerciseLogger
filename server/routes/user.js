const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    loginUser,
    signUpUser,
    deleteUser,
    updateUser,
    updatePassword
} = require('../controllers/userController')

// login
router.post('/login', loginUser);

// sign up
router.post('/signup', signUpUser);

// delete user
router.delete('/:id', requireAuth, deleteUser);

// patch user
router.patch('/:id/password', requireAuth, updatePassword);

// update user
router.patch('/:id', requireAuth, updateUser);

module.exports = router;