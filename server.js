require('dotenv').load();

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    env         = process.env,
    mysql       = require('mysql'),
    db          = require('./server/db.js')();
    units				= require('./server/models/unit.js');

var port = env.PORT || 3000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Version 1 of the API
app.use('/api/v1', require('./routes/api/v1.js')(express));


// START THE SERVER
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var server = app.listen(port, function(){
  console.log("server is listening on port", port);
});