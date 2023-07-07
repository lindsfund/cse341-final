const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sources: {
        type: String,
        required: true
    }
})