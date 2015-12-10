// Gravity Application Server | NPM Modules
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// located in the node_modules [use npm install to update from package.json]
var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').load();
var mysql = require('mysql');
var db = require('.server/models/order.js');


// Initialize Application
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app = express();
var port = process.env.PORT || 3000;

// Middleware
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));


// Routes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// TODO: add passport to parameters
app.use('/api/v1/order', require('./server/routes/api/v1/order/list.js')(express));
app.use('/api/v1/unit', require('./server/routes/api/v1/unit/create.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/order/status/shipping.js')(express));


// Start The Server
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var server = app.listen(port, function() {
  console.log('Server Active on Port ' + port);
});
