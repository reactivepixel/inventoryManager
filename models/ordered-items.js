'use strict';
module.exports = function() {
  const db = require('../server/db.js')();
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  // Defining orderedItems based on the table schema from the db.js
  let orderedItems = db.orderedItems;
}
