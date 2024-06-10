const User = require('../models/userModel')

// login 

const loginUser = async (req, res) => {
    res.json({msg: 'login user'})
}


// sign up


const signUpUser = async (req, res) => {
    res.json({msg: 'login user'})
}

module.exports = {
    loginUser,
    signUpUser
}