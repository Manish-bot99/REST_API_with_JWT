const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter valid name!"],
        minlength: 6,
        maxlength: 1024
    },
    email: {
        type: String,
        required: [true, "Please enter valid email!"],
        minlength: 6,
        maxlength: 1024
    },
    password: {
        type: String,
        required: [true, "Please enter valid password!"],
        minlength: 8,
        maxlength: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)