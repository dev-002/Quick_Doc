const express = require('express');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Approve = require('../models/Approve');

const router = express.Router();

// async function doctorAppoitment(_id) {
//     return await Appointment.find({ doctor: _id }).populate('patient').populate('doctor');
// };

// async function patientAppoitment(_id) {
//     return await Appointment.find({ patient: _id }).populate('patient').populate('doctor');
// };

async function checkPastAppointment() {
    const currentTime = new Date();
    const appointments = await Appointment.find();
    for (let appointment of appointments) {
        const appointmentTime = new Date(appointment.appointmentDate)
        if (currentTime > appointmentTime) {
            await Appointment.deleteOne({ _id: appointment._id });
        }
    }
}

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/patient/login', async (req, res) => {
    const { name, password } = req.body.patient;
    const patient = await Patient.findOne({ name });
    // Searching and Displaying the Appointment Details
    if (patient && patient.password === password) {
        await checkPastAppointment();

        const pendingAppointment = await Approve.find({}).populate('accepted').populate('rejected')
            .then(async (approves) => {
                const accepted = approves.flatMap((approve) =>
                    approve.accepted.map((appointment) => appointment._id)
                );
                const rejected = approves.flatMap((approve) =>
                    approve.rejected.map((appointment) => appointment._id)
                );
                return await Appointment.find({
                    patient: patient._id,
                    _id: {
                        $nin: [...accepted, ...rejected],
                    }
                }).populate('patient').populate('doctor');
            });

        const approves = await Approve.findOne({}).populate({
            path: 'accepted',
            populate: [{ path: 'patient' }, { path: 'doctor' }]
        }).populate({
            path: 'rejected',
            populate: [{ path: 'patient' }, { path: 'doctor' }]
        });
        const accepted = approves.accepted.filter(obj => {
            if (obj.patient._id.toString() === patient._id.toString())
                return obj
        })
        const rejected = approves.rejected.filter(obj => {
            if (obj.patient._id.toString() === patient._id.toString())
                return obj
        })

        res.render('Patient/dashboard', { patient, pendingAppointment, accepted, rejected });
    }
    else
        res.render('error', { error: 'Wrong Credentials' });
});

router.post('/patient/signup', async (req, res) => {
    const patient = new Patient({ ...req.body.patient });
    await patient.save();
    res.render('Patient/dashboard', { patient, pendingAppointment: [], accepted: [], rejected: [] });
});

router.post('/doctor/login', async (req, res) => {
    let { name, password } = req.body.doctor;
    const doctor = await Doctor.findOne({ name });
    // Searching and Displaying the Appointment Details
    if (doctor && doctor.password === password) {
        await checkPastAppointment();

        const pendingAppointment = await Approve.find({}).populate('accepted').populate('rejected')
            .then(async (approves) => {
                const accepted = approves.flatMap((approve) =>
                    approve.accepted.map((appointment) => appointment._id)
                );
                const rejected = approves.flatMap((approve) =>
                    approve.rejected.map((appointment) => appointment._id)
                );

                return await Appointment.find({
                    doctor: doctor._id,
                    _id: {
                        $nin: [...accepted, ...rejected],
                    }
                }).populate('patient').populate('doctor');
            });

        const approves = await Approve.findOne().populate({
            path: 'accepted',
            populate: [{ path: 'patient' }, { path: 'doctor' }]
        })
            .populate({
                path: 'rejected',
                populate: [{ path: 'patient' }, { path: 'doctor' }]
            });
        const accepted = approves.accepted.filter(obj => {
            if (obj.doctor._id.toString() === doctor._id.toString())
                return obj
        })
        const rejected = approves.rejected.filter(obj => {
            if (obj.doctor._id.toString() === doctor._id.toString())
                return obj
        })
        res.render('Doctor/dashboard', { doctor, pendingAppointment, accepted, rejected });
    }
    else
        res.render('error', { error: 'Wrong Credentials' });
});

router.post('/doctor/signup', async (req, res) => {
    const doctor = new Doctor({ ...req.body.doctor });
    await doctor.save();
    res.render('Doctor/dashboard', { doctor, pendingAppointment: [], accepted: [], rejected: [] });
});

module.exports = router;