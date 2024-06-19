const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Filter = require('bad-words');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
// login 

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({ email, token, _id: user._id, username: user.username })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// sign up
const signUpUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signup(email, password, username)

        const token = createToken(user._id)
        res.status(200).json({ email, token, username, _id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information
        const filter = new Filter();
        if (filter.isProfane(username)) {
            throw Error("Username contains inappropriate language.");
        }
        if (username) user.username = username;
        if (email) {
            // Check if the new email is already in use
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== id) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            user.email = email;
        }

        // Save the updated user
        await user.save();

        // Create a new token
        const token = createToken(user._id);

        res.status(200).json({
            email: user.email,
            username: user.username,
            token,
            _id: user._id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Validate new password
        if (!validator.isStrongPassword(newPassword, {
            minLength: 8,
            maxLength: 20,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })) {
            return res.status(400).json({ error: 'New password is not strong enough! Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, and one number.' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hash;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    signUpUser,
    deleteUser,
    updateUser,
    updatePassword
}