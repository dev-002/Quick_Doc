const express = require('express');

const router = express.Router();

router.get('/accept', (req, res) => {
    res.send('Accepted');
});

router.get('/reject', (req, res) => {
    res.send('Rejected');
});

module.exports = router;