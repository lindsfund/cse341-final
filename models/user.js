const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    birthday: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    }
});