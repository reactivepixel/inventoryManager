'use strict';

// Config
const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

<<<<<<< HEAD
=======
// Adding body parser to parse json automatically
>>>>>>> 3331767e9feb3862b3c14d53c8eb96caf918ca24
app.use(body_parser.json());

// Routes
app.use('/', require('../routes/home.js')(express));
app.use('/order', require('../routes/order.js')(express));

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
