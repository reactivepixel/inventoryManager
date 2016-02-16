'use strict';
const db = require('../server/db.js')();
const Sequelize = require('sequelize');
const sequelize = db.connection;

const orders = sequelize.define('orders', {
    orderId: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING
    },
    streetAddress: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    timeStamp: {
        type: Sequelize.STRING
    }
});

sequelize.sync();
