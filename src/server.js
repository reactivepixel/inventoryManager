'use strict';
const express = require('express');
const body_parser = require('body-parser');
const app = express();

//Config
const port = process.env.PORT || 3000;

app.use('/', require('../routes/index.js')(express));
app.use('/', require('../routes/order.js')(express));

app.listen(port, function() {
    console.log("Listening on "+port+"...");
});
