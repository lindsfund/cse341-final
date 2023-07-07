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
    source: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('node', nodeSchema);
