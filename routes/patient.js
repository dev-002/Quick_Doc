const express = require('express');

const router = express.Router();

router.get('/appointment', (req, res)=>{
    res.render('appointment');
});

router.post('/bookAppointment',(req, res)=>{
    const appointment = req.body.appointment;
    console.log(appointment);

    res.send("Appointment Sent");
});

module.exports = router;