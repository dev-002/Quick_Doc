const express = require('express');
const Approve = require('../models/Approve');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const router = express.Router();

router.get('/accept/:_id', async (req, res) => {
    const appointment = await Appointment.findOne({ _id: req.params._id });
    const accept = appointment && await Approve.findOneAndUpdate(
        {},
        { $push: { accepted: appointment._id } },
        { new: true });
    await accept.save();
    res.redirect('/login');
});

router.get('/reject/:_id', async (req, res) => {
    const appointment = await Appointment.findOne({ _id: req.params._id });
    const rejected = appointment && await Approve.findOneAndUpdate(
        {},
        { $push: { rejected: appointment._id } },
        { new: true });
    await rejected.save();
    res.redirect('/login');
});

module.exports = router;