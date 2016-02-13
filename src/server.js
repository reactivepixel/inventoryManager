'use strict';

// Config
const express = require('express');
const body_parser = require('body-parser');

const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Body Parser
app.use(body_parser.json());

// Routes
app.use('/', require('../routes/index.js')(express));
app.use('/order', require('../routes/order.js')(express));

// Start server
var server = app.listen(port, function() {
    console.log("Listening on "+port+"...");
});

module.exports = server;
