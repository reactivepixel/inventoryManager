'use strict';

// Config
const express = require('express');
const body_parser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Routes
app.use('/', require('../routes/index.js')(express));
app.use('/', require('../routes/order.js')(express));

// Start server
app.listen(port, function() {
    console.log("Listening on "+port+"...");
});
