const express = require('express');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/patient/login', async (req, res) => {
    const { name, password } = req.body.patient;
    const patient = await Patient.findOne({ name });
    const appointments = await Appointment.find({ patient: patient._id }).populate('patient').populate('doctor');
    // const { patient: { name: PatientName  },  doctor: { name: DoctorName }, appointmentTime, appointmentDate, appointmentType} = await Appointment.find({ patient: patient._id }).populate('patient').populate('doctor');
    // const appointment = {
    //     PatientName,
    //     DoctorName,
    //     time: appointmentTime,
    //     date: appointmentDate,
    //     type: appointmentType
    // };
    if (patient && patient.password === password)
        res.render('Patient/dashboard', { patient, appointments });
    else
        res.send("Wrong Credentials");
});

router.post('/patient/signup', async (req, res) => {
    const patient = new Patient({ ...req.body.patient });
    await patient.save();
    res.render('Patient/dashboard', { patient });
});

router.post('/doctor/login', async (req, res) => {
    let { name, password } = req.body.doctor;
    doctor = await Doctor.findOne({ name });
    if (doctor && doctor.password === password)
        res.render('Doctor/dashboard', { doctor });
    else
        res.send("Wrong Credentials");
});

router.post('/doctor/signup', async (req, res) => {
    const doctor = new Doctor({ ...req.body.doctor });
    await doctor.save();
    res.render('Doctor/dashboard', { doctor });
});

module.exports = router;