const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'patient' },
    doctor: { type: Schema.Types.ObjectId, ref: 'doctor' },
    appointmentDate: {
        type: Date,
        required: true,
        // default: Date.now(),
        // validate: {
        //     validator: function (date) {
        //         console.log(date.toString())
        //     },
        //     message: "Appointment Date should be in future"
        // }
    },
    appointmentTime: {
        type: Date,
        required: true,
        // min: Date.now(),
        validate(time) {
            const timeArr = time.toString().split(' ')[4].split(':');
            if (!((timeArr[1] % 20 === 0) && (timeArr[0] >= 16 && timeArr[0] <= 18)))
                throw new Error("Time should be between 4pm to 6pm \nAnd should be at an interval of 20 min");
        },
        required: [true, "Appointment Time Requires"]
    },
    appointmentType: {
        type: String,
        required: true,
        enum: { values: ["General Consultation", "Dental Checkup", "Eye Exam", "Physical Therapy", "Psychiatric Evaluation"], message: "{VALUE} Consultaion Available" }
    }
});

module.exports = mongoose.model('appointment', appointmentSchema);