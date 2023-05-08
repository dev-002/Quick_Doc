if(process.env.NODE != 'production'){
    require('dotenv').config();
}
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set(express.static('public'));

// Routes
const indexRoute = require('./routes/index');
const patientRoute = require('./routes/patient');

app.use('/', indexRoute);
app.use('/patient',patientRoute);

app.listen(5000, ()=>console.log("Server started..."));