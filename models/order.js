const db = require('../server/db.js')();
const Sequelize = require('sequelize');
const sequelize = db.connection;

console.log('hey', sequelize);
