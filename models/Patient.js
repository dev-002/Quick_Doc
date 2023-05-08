const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('patient', patientSchema);