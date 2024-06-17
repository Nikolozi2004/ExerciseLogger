const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Filter = require('bad-words');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
})

// method sign
userSchema.statics.signup = async function (email, password, username) {
    const errors = [];
    if (!email) errors.push("Email is required.");
    if (!password) errors.push("Password is required.");
    if (!username) errors.push("Username is required.");

    if (errors.length > 0) {
        if (errors.length === 3) {
            throw Error("All fields must be filled");
        } else {
            throw Error(errors.join(" "));
        }
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        maxLength: 20,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    })) {
        throw Error("Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
    }

    if (username.length < 3 || username.length > 20) {
        throw Error("Username must be between 3 and 20 characters long.");
    }

    const filter = new Filter();
    if (filter.isProfane(username)) {
        throw Error("Username contains inappropriate language.");
    }

    const exists = await this.findOne({ $or: [{ email }, { username }] });
    if (exists) {
        throw Error(exists.email === email ? "Email is already in use" : "Username is already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, username });

    return user;
}

// method login
userSchema.statics.login = async function (email, password) {

    const errors = [];
    if (!email) errors.push("Email is required.");
    if (!password) errors.push("Password is required.");

    if (errors.length > 0) {
        if (errors.length === 2) {
            throw Error("All fields must be filled");
        } else {
            throw Error(errors.join(" "));
        }
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect Password")
    }

    return user
}


// method update
userSchema.statics.updateUser = async function (id, username, email) {
    const user = await this.findById(id);

    if (!user) {
        throw Error("User not found");
    }

    if (email && email !== user.email) {
        if (!validator.isEmail(email)) {
            throw Error("Email is not valid");
        }
        const emailExists = await this.findOne({ email });
        if (emailExists) {
            throw Error("Email is already in use");
        }
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    return user;
}

module.exports = mongoose.model("User", userSchema);