var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var usersRoute = require('./routes/users');

var app = express();

// Automatically parses JSON bodies of requests
app.use(bodyParser.json());
app.use((req, res, next) => {
    // For local testing purposes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Add routes
app.use('/users', usersRoute);

// Server init
app.listen(3000, function () {
    // Assuming a local mongodb instance with the db GalaProDB
    mongoose.connect('mongodb://localhost/GalaProDB')
        .then(() => console.log('mongodb: connection succesful'))
        .catch((err) => console.error(err));
    console.log('express: listening on 3000');
});

