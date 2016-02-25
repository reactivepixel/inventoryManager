'use strict';
module.exports = function() {

  // Requiring dependencies.
  const dotenv = require('dotenv').load();
  const Sequelize = require('sequelize');
  const mysql = require('mysql');

  // Initializing sequelize
  const _sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  // Creating inventory table schema
  const _inventory = _sequelize.define('inventory', {
    sku: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    }
  });

  // Creating orderedItems table schema
  const _orderedItems = _sequelize.define('orderedItems', {
    sku: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.STRING
    }
  });

  // Creating orders table schema
  const _orders = _sequelize.define('orders', {
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

  // Creating units table schema
  const _units = _sequelize.define('units', {
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

  _order.hasMany(_orderedItems, {foreignKey: 'orderId'});

  // Syncs newly created tables and data inside the tables
  _sequelize.sync();

  // Returns data to be called in the models
  return {
    connection: _sequelize,
    inventory: _inventory,
    orderedItems: _orderedItems,
    orders: _orders,
    units: _units
  };
}();
