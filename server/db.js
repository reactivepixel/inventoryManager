'use strict';
module.exports = function() {

  //Requring dependencies.
  const dotenv = require('dotenv').load();
  const Sequelize = require('sequelize');
  const mysql = require('mysql');

  //Initizling sequelize.
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: { max: 5, min: 0, idle: 10000 }
  });

  //Creating inventory table    
  const inventory = sequelize.define('inventory', {
    sku: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    }
  });
    
  //Creting itemOrders table    
  const orderedItems = sequelize.define('orderedItems', {
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

  //Creating orders table
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

  //Creating units table    
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

	//Syncs newly created tables and data inside the tables
  sequelize.sync();
	
	//returns data to be called in the models
  return { 
    connection: sequelize,
    inventory: inventory,
    orderedItems: orderedItems,
    orders: orders,
    units: units
  };
}();