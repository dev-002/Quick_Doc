const express = require('express');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Approve = require('../models/Approve');

const router = express.Router();

async function doctorAppoitment(_id) {
    return await Appointment.find({ doctor: _id }).populate('patient').populate('doctor');
};

async function patientAppoitment(_id) {
    return await Appointment.find({ patient: _id }).populate('patient').populate('doctor');
};

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/patient/login', async (req, res) => {
    const { name, password } = req.body.patient;
    const patient = await Patient.findOne({ name });
    const appointments = patient && await patientAppoitment(patient._id);
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
        res.render('error', { error: 'Wrong Credentials' });
});

router.post('/patient/signup', async (req, res) => {
    const patient = new Patient({ ...req.body.patient });
    await patient.save();
    const appointments = await patientAppoitment(patient._id);
    res.render('Patient/dashboard', { patient, appointments });
});

router.post('/doctor/login', async (req, res) => {
    let { name, password } = req.body.doctor;
    doctor = await Doctor.findOne({ name });
    const appointments = doctor && await doctorAppoitment(doctor._id);

    const approve = await Approve.findOne({}).populate({
        path: 'accepted',
        populate: [{ path: 'patient' }, { path: 'doctor' }]
    })
        .populate({
            path: 'rejected',
            populate: [{ path: 'patient' }, { path: 'doctor' }]
        });
    if (doctor && doctor.password === password)
        res.render('Doctor/dashboard', { doctor, appointments, approve });
    else
        res.render('error', { error: 'Wrong Credentials' });
});

router.post('/doctor/signup', async (req, res) => {
    const doctor = new Doctor({ ...req.body.doctor });
    await doctor.save();
    const appointments = await doctorAppoitment(doctor._id);

    const approve = await Approve.findOne({}).populate({
        path: 'accepted',
        populate: [{ path: 'patient' }, { path: 'doctor' }]
    })
        .populate({
            path: 'rejected',
            populate: [{ path: 'patient' }, { path: 'doctor' }]
        });

    res.render('Doctor/dashboard', { doctor, appointments, approve });
});

module.exports = router;