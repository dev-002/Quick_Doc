const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('patient', patientSchema);