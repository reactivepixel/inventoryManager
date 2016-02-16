'use strict';
const db = require('../server/db.js')();
const Sequelize = require('sequelize');
const sequelize = db.connection;

const inventory = sequelize.define('inventory', {
    sku: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    }
});

sequelize.sync();
