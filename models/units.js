'use strict';
module.exports = function() {
  const db = require('../server/db.js')();
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  // Defining units based on the table schema from the db.js
  let units = db.units;
}
