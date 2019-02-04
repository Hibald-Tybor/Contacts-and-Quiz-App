const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Contact = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    }
})

module.exports = mongoose.model('Contact', Contact);

