// Gravity Application Server | NPM Modules
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Located in the node_modules [use npm install to update from package.json]
var express     = require('express');
var bodyParser  = require('body-parser');
var dotenv      = require('dotenv').load();
var mysql       = require('mysql');

// Initialize Application
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app         = express();
var port        = process.env.PORT || 3000;

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

// Worker based routes
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/shipping.js')(express));
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/picking.js')(express));
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/packaging.js')(express));
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/inspecting.js')(express));
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/occupied.js')(express));
app.use('/api/v1/worker/status', require('./server/routes/api/v1/worker/status/available.js')(express));

// Pod based routes
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/find.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/create.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/remove.js')(express));
app.use('/api/v1/pod', require('./server/routes/api/v1/pod/update.js')(express));

app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/available.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/loading.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/maintenance.js')(express));
app.use('/api/v1/pod/status', require('./server/routes/api/v1/pod/status/picking.js')(express));
