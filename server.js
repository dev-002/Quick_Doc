if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Mongoose Database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "connection-error"));
// db.once("open", () => console.log("Database Connected"));

// Routes
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const patientRoute = require('./routes/patient');
const docotrRoute = require('./routes/doctor');

app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/patient', patientRoute);
app.use('/doctor', docotrRoute);

app.listen(process.env.PORT, () => console.log("Server started..."));