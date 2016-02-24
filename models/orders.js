'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  // Defining orders based on the table schema from the db.js
  function _create(data, err, success) {
    let payload = data;
    db.order.create(payload).then(success).catch(err)
  }
  
}();
