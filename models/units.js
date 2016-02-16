'use strict';
const db = require('../server/db.js')();
const Sequelize = require('sequelize');
const sequelize = db.connection;

const units = sequelize.define('units', {
    sku: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

 sequelize.sync();
