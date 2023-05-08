const mongoose = require('mongoose');
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    patient: {type: Schema.Types.ObjectId, ref: 'patient'},
    doctor: {type: Schema.Types.ObjectId, ref: 'doctor'},
    appointmentDate: Date,
    appointmentTime: Date,
    appointmentType: String
});

module.exports = mongoose.model('appointment', appointmentSchema);