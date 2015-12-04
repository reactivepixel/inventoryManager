require('dotenv').load();

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    env         = process.env,
    Sequelize   = require('sequelize');

// Config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var port = env.PORT || 3000;

var sequelize = new Sequelize(env.DB_NAME, env.MYSQL_NAME, env.MYSQL_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


//Create Orders Table

var Orders = sequelize.define('orders', {
  order_id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    autoIncrement: true 
  },
  time_stamp: {
    type: Sequelize.STRING,
    createdAt: true
  },
  recipient: {
    type: Sequelize.STRING,
  },
  unit_id: {
    type: Sequelize.STRING,
  }

})

sequelize.sync();
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
var server = app.listen(port);
console.log('Server Active on Port ' + port);
console.log("----Environment Variables----");
console.log("Database Name: " + env.DB_NAME);