if(process.env.NODE != 'production'){
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set(express.static('public'));

// Routes
const indexRoute = require('./routes/index');
const patientRoute = require('./routes/patient');
const loginRoute = require('./routes/login');

app.use('/', indexRoute);
app.use('/patient',patientRoute);
app.use('/login', loginRoute);

app.listen(5000, ()=>console.log("Server started..."));