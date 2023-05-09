const express = require('express');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

const router = express.Router();

router.get('/appointment', async (req, res) => {
    let doctor = await Doctor.find({});
    doctor = doctor.map(doc => doc.name);
    res.render('appointment', { doctor });
});

router.post('/bookAppointment', async (req, res) => {
    async function timeSet(time) {
        const timeArray = time.split(":");
        const date = new Date();
        date.setHours(timeArray[0]);
        date.setMinutes(timeArray[1]);
        date.setSeconds(0);
        return date;
    }
    console.log(req.body.appointment);
    const doctor = await Doctor.findOne({ name: req.body.appointment.doctor });
    const patient = await Patient.findOne({ name: req.body.appointment.patient });
    const { appointmentTime: time } = req.body.appointment;
    const appointment = new Appointment({ ...req.body.appointment, doctor: doctor._id, patient: patient._id, appointmentTime: await timeSet(time) });
    await appointment.save();
    res.redirect('/login');
});

module.exports = router;