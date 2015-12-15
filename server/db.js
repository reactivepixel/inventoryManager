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
    shipping_tracking:  {
      type: Sequelize.INTEGER
    }
  });


  // Create Units Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var unit = sequelize.define('units', {
    sku: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    availability_qty: {
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
  var unit_issue = sequelize.define('issues', {
    issue: {
      type: Sequelize.STRING
    }
  });


  // Create worker Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var worker = sequelize.define('workers', {
    name: {
      type: Sequelize.STRING,
    },
    pin: {
      type:Sequelize.INTEGER,
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


  // Create issue_type Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var issue_type = sequelize.define('issue_type', {
    issue_desc: {
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
  var shipment_unit = sequelize.define('shipment_unit', {
    ship_id: {
      type: Sequelize.INTEGER
    },
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


  // Maintenance Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var maintenance = sequelize.define('maintenance', {
    pod_id:{
      type:Sequelize.INTEGER
    },
    type:{
      type:Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  });


  // Maintenance type
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var maint_type = sequelize.define('maintenance', {
    maint_desc:{
      type:Sequelize.STRING,
    },
    maint_types:{
      type: Sequelize.STRING,
    }
  });


  // Recipients Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var recipient = sequelize.define('recipients', {
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

  // Table Relations
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  order.hasOne(order_unit);
  pack.hasOne(status);
  job.hasOne(worker, {foreignKey: 'job_id'});
  unit.hasOne(inventory, {foreignKey: 'inventoryId'});
  unit.hasOne(shipment_unit, {foreignKey: 'sku'});
  shipment_unit.hasOne(replenishment, {foreignKey: 'ship_id'});
  order.hasOne(shipping_method, {foreignKey: 'orderId'});
  pod.hasOne(maintenance, {foreignKey: 'pod_id'});
  status.hasOne(pod, {foreignKey: 'status'});
  status.hasOne(maintenance, {foreignKey: 'status'});
  order.hasOne(worker, {foreignKey: 'order_id'});
  status.hasOne(worker, {foreignKey: 'status'});
  status.hasOne(inventory, {foreignKey:'status'});
  order.hasOne(inventory, {foreignKey: 'order_id'});
  status.hasOne(inventory, {foreignKey: 'status'});
  order.hasOne(order_unit, {foreignKey: 'orderId'});
  pack.hasOne(package_unit, {foreignKey:'pkg_id'});
  inventory.hasOne(package_unit, {foreignKey: 'unit_id'});
  pack.hasOne(order, {foreignKey: 'packId'});
  recipient.hasOne(order, {foreignKey: 'recipient_id'});
  status.hasOne(order, {foreignKey: 'status'});
  inventory.hasOne(issue, {foreignKey: ''})

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
