const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/patient/login', (req, res) => {
    const patient = req.body.patient;
    res.render('Patient/dashboard', { patient });
});

router.post('/patient/signup', (req, res) => {
    // res.render('Patient/dashboard');
    res.send(req.body.patient);
});

router.post('/doctor/login', (req, res) => {
    const doctor = req.body.doctor;
    res.render('Doctor/dashboard', { doctor });
});

router.post('/doctor/signup', (req, res) => {
    // res.render('Doctor/dashboard');
    res.send(req.body.doctor);
});

module.exports = router;