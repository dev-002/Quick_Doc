const express = require('express');
const { route } = require('.');

const router = express.Router();

router.get('/appointment', (req, res)=>{
    res.render('appointment');
});

router.post('/book-appointment',(req, res)=>{
    const appointment = req.body.appointment;
    console.log(appointment);

    res.send("Appointment Sent");
});

module.exports = router;