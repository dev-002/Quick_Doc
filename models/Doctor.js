const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('doctor', doctorSchema);