if (process.env.NODE != 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(express.static('public'));

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
const patientRoute = require('./routes/patient');
const loginRoute = require('./routes/login');

app.use('/', indexRoute);
app.use('/patient', patientRoute);
app.use('/login', loginRoute);

app.listen(process.env.PORT, () => console.log("Server started..."));