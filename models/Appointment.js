const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'patient' },
    doctor: { type: Schema.Types.ObjectId, ref: 'doctor' },
    appointmentDate: {
        type: Date,
        // set: function (date) {
        //     const validated = date.toLocalDateString().split(' ');
        //     return validated[1] + ' ' + validated[2] + ' ' + validated[3];
        // }
    },
    appointmentTime: {
        type: Date,
        // set: function (date) {
        //     return date.getHours().getMinutes();
        // }
    },
    appointmentType: String
});

module.exports = mongoose.model('appointment', appointmentSchema);