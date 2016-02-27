'use strict';

// Config
const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Adding body parser to parse json automatically
app.use(body_parser.json());

// Routes
app.use('/', require('../routes/home.js')(express));
app.use('/order', require('../routes/order.js')(express));
app.use('/inventory', require('../routes/inventory.js')(express));

// Start server
var server = app.listen(port, function() {
    console.log("Listening on " + port + "...");
});

module.exports = server;
