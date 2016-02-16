'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  // Defining orderedItems based on the table schema from the db.js
  let orderedItems = db.orderedItems;
	
	// Inserts items into the database
	orderedItems.build({
		sku: 'j098341jacjk0',
		orderId: '1',
		quantity: '4'
	}).save()
}();