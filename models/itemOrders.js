'use strict';
const db = require('../server/db.js')();
const Sequelize = require('sequelize');
const sequelize = db.connection;

const itemOrders = sequelize.define('itemOrders', {
    sku: {
        type: Sequelize.STRING
    },
    orderId: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.STRING
    }
});

 sequelize.sync();
