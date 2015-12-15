// Gravity Application Server | NPM Modules
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Located in the node_modules [use npm install to update from package.json]
var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').load();
var mysql = require('mysql');

// Initialize Application
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app = express();
var port = process.env.PORT || 3000;

// Middleware
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// For parsing application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Order based routes
app.use('/api/v1/order', require('./server/routes/api/v1/order/find.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/order/create.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/order/remove.js')(express));
app.use('/api/v1/order', require('./server/routes/api/v1/order/update.js')(express));

app.use('/api/v1/order/status', require('./server/routes/api/v1/order/status/shipping.js')(express));
app.use('/api/v1/order/status', require('./server/routes/api/v1/order/status/shipped.js')(express));
app.use('/api/v1/order/status', require('./server/routes/api/v1/order/status/picking.js')(express));
app.use('/api/v1/order/status', require('./server/routes/api/v1/order/status/packaging.js')(express));
app.use('/api/v1/order/status', require('./server/routes/api/v1/order/status/inspecting.js')(express));

// Unit based routes
app.use('/api/v1/unit', require('./server/routes/api/v1/unit/find.js')(express));
app.use('/api/v1/unit', require('./server/routes/api/v1/unit/create.js')(express));
app.use('/api/v1/unit', require('./server/routes/api/v1/unit/remove.js')(express));
app.use('/api/v1/unit', require('./server/routes/api/v1/unit/update.js')(express));

app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/shipping.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/shipped.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/picking.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/packaging.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/inspecting.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/receiving.js')(express));
app.use('/api/v1/unit/status', require('./server/routes/api/v1/unit/status/available.js')(express));

// Pod based routes
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/find.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/create.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/remove.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/update.js')(express));

app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/available.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/loading.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/maintenance.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/picking.js')(express));



// TODO: Not all routes defined dev team
// TODO: add passport to parameters, define separate route directory

// Start The Server
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var server = app.listen(port, function() {
  console.log('Server Active on Port ' + port);
  console.log('NOTICE ============');
  console.log('BUILD NEW DATABASE Version 1.6.1');
  console.log('STEP 0: terminal: git pull origin master');
  console.log('STEP 1: terminal: npm install');
  console.log('STEP 2: terminal: mysql.server restart');
  console.log('STEP 3: terminal: mysql -u root;');
  console.log('STEP 4: terminalSQL: drop database gravity;');
  console.log('STEP 5: terminalSQL: create database gravity;');
  console.log('STEP 6: terminal: gulp dev');
  console.log('STEP 7: terminal: npm start server.js');
  console.log('NOTICE ============');
});
