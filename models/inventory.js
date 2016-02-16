'use strict';
module.exports = function() {
	const db = require('../server/db.js')();
	const Sequelize = require('sequelize');
	const sequelize = db.connection;
	const inventory = db.inventory;
}();