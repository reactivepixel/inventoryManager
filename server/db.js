module.exports = function(){
  var express = require('express');
  var mysql = require('mysql');
  var Sequelize = require('sequelize');
  var dotenv = require('dotenv').load();

  // FIXME: app should be defined and passed in with express in te module.export
  var app = express();


  // Config
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  var sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_NAME, process.env.MYSQL_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {max: 5, min: 0, idle: 10000}
  });

  // Checking connection status
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var test = sequelize.authenticate().then(function(){
      console.log("connected");
    }).catch(function(err){
      console.log("something goofed", err);
    })
    .done();


  // Create order Tables
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var order = sequelize.define('orders', {
    name:{
      type:Sequelize.INTEGER
    },
    address:{
      type:Sequelize.INTEGER
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
    }
  });


  // Create Units Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var unit = sequelize.define('units', {
    sku: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    statusId: {
      type:Sequelize.INTEGER,
    },
    available_qty: {
      type: Sequelize.INTEGER
    },
    trigger_qty: {
      type: Sequelize.INTEGER
    },
    replenish_qty: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    weight_lbs: {
      type: Sequelize.INTEGER
    }
  });

  // Create Unit Issues Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var issue = sequelize.define('issues', {
    issue: {
      type: Sequelize.STRING
    }
  });


  // Create worker Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var worker = sequelize.define('workers', {
    name: {
      type: Sequelize.STRING
    },
    pin: {
      type:Sequelize.INTEGER
    }
  });


  // Create Jobs Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var job = sequelize.define('jobs', {
    job_desc: {
      type: Sequelize.STRING
    }
  });


  // Create Pods Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var pod = sequelize.define('pods', {
    current_weight: {
      type: Sequelize.INTEGER
    },
    max_weight: {
      type: Sequelize.INTEGER
    },
    last_maintained: {
      type: Sequelize.STRING,
      updatedAt: true
    }
  });


  // Create status Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var status = sequelize.define('status', {
    status_type: {
      type: Sequelize.STRING
    }
  });

  // Create Shipment Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var replenishment = sequelize.define('replenishments', {});


  // Create Shipping_method Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var shipping_method = sequelize.define('shipping_method', {
    description: {
      type: Sequelize.STRING
    }
  });


  //Create shipment_unit table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var replenishment_unit = sequelize.define('replenishment_units', {
    sku:{
      type:Sequelize.INTEGER
    },
    qty:{
      type:Sequelize.INTEGER
    }
  });


  // Create unit_pods Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var order_unit = sequelize.define('order_units', {
    sku:{
      type:Sequelize.INTEGER
    },
    qty:{
      type:Sequelize.INTEGER
    }
  });


  // Inventory Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var inventory = sequelize.define('inventory', {
    sku:{
      type:Sequelize.INTEGER
    },
    order_id: {
      type: Sequelize.INTEGER
    }
  });


  // Package Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // FIXME: package is a key word find a new word
  var pack = sequelize.define('packs', {
    order_id:{
      type:Sequelize.STRING
    }
  });


  // Package_Units Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var package_unit = sequelize.define('package_units', {
    pkg_id:{
      type:Sequelize.INTEGER
    },
    unit_id:{
      type:Sequelize.INTEGER
    },
    qty: {
      type: Sequelize.INTEGER
    }
  });


  // Table Relations
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  
  status.hasOne(pack, {foreignKey: 'status'});
  job.hasOne(worker, {foreignKey: 'job_id'});
  unit.hasOne(inventory, {foreignKey: 'sku'});
  //unit.hasOne(package_unit, {foreignKey: 'sku'});
  replenishment_unit.hasOne(replenishment, {foreignKey: 'replenishment_id'});
  shipping_method.hasOne(order, {foreignKey: 'orderId'});
  status.hasOne(pod, {foreignKey: 'status'});
  //status.hasOne(maintenance, {foreignKey: 'status'});
  order.hasOne(worker, {foreignKey: 'order_id'});
  status.hasOne(worker, {foreignKey: 'status'});
  status.hasOne(inventory, {foreignKey:'status'});
  order.hasOne(inventory, {foreignKey: 'order_id'});
  status.hasOne(inventory, {foreignKey: 'status'});
  order.hasOne(order_unit, {foreignKey: 'orderId'});
  pack.hasOne(package_unit, {foreignKey:'pkg_id'});
  inventory.hasOne(package_unit, {foreignKey: 'unit_id'});
  pack.hasOne(order, {foreignKey: 'packId'});
  status.hasOne(order, {foreignKey: 'status'});
  inventory.hasOne(issue, {foreignKey: 'inventoryId'});
  //pod.hasOne(maintenance, {foreignKey: 'pod_id'});
  unit.hasOne(order_unit, {foreignKey: 'sku'});
  status.hasOne(order, {foreignKey: 'status'});
  shipping_method.hasOne(order, {foreignKey:'shipping_method'});


  // Creating all the tables in the proper orders
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Push all tables to database
  sequelize.sync();
  return {
    connection: sequelize,
    order: order,
    unit: unit,
    worker: worker,
    job: job,
    pod: pod,
    status: status,
    unit_pod: pod
  };
};