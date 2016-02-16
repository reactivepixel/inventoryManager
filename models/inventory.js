'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  // Defining inventory based on the table schema from the db.js
  let inventory = db.inventory;
}();