const mongoose = require('mongoose');
require('mongoose-type-url');

const mongoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: mongoose.SchemaTypes.Url,
        required: true
    }
})

module.exports = mongoose.model('mongodb', mongoSchema);