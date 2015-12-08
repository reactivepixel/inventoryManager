// Gravity Application Server | NPM Modules
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// located in the node_modules [use npm install to update from package.json]
var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').load();
var env = process.env;
var mysql = require('mysql');
var db = require('./server/db.js')();

// Initialize Application
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app = express();
var port = env.PORT || 3000;


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
app.use('/api/v1/order', require('./server/routes/api/v1/order/find.js')(express));
//app.use('api/v1/orderCreate', require('./server/routes/api/v1/orderCreate.js')(router, sampleDatabase));
app.use('/api/v1/order', require('./server/routes/api/v1/status/picking.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/status/inspecting.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/status/packaging.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/status/shipping.js')(express));


// Start The Server
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var server = app.listen(port, function() {
  console.log('Server Active on Port ' + port);
});
