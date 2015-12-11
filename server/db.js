module.exports = function(){
  var express     = require('express');
  var app         = express();
  var mysql       = require('mysql');
  var Sequelize   = require('sequelize');

  var dotenv = require('dotenv').load();

  // Config
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_NAME, process.env.MYSQL_PASS, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port:8889,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    // Checking connection status
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var test = sequelize.authenticate().then(function(){
        console.log("connected");
      }).catch(function(err){
        console.log("something goofed", err);
      })
      .done()

    // Create Tables
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var order = sequelize.define('orders', {
      time_stamp: {
        type: Sequelize.STRING,
        createdAt: true
      },
      recipient_id: {
        type: Sequelize.STRING,
      },
      shipping_method: {
        type: Sequelize.INTEGER,
      },
      shipping_tracking: {
        type: Sequelize.INTEGER,
      }
    })
    // Create Units Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var unit = sequelize.define('units', {
      sku: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      availability_qty: {
        type: Sequelize.INTEGER,
      },
      trigger_qty: {
        type: Sequelize.INTEGER,
      },
      replenish_qty: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      weight_lbs: {
        type: Sequelize.INTEGER
      }

    })

    // Create Order_Units Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var order_unit = sequelize.define('order_units', {
      order_in: {
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      }

    })

    // Create Unit_Issues Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var unit_issues = sequelize.define('unit_issues', {
      sku: {
        type: Sequelize.INTEGER,
      },
      issue_type: {
        type: Sequelize.INTEGER,
      },

    })


    // Create Unit Issues Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var issue_type = sequelize.define('issue_types', {
      issue_desc: {
        type: Sequelize.STRING,
      },

    })

    // Create worker Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var worker = sequelize.define('workers', {
      name: {
        type: Sequelize.STRING,
      },
      job_id: {
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      pin:{
        type: Sequelize.INTEGER,
      }

    })

    // Create Jobs Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var job = sequelize.define('jobs', {
      job_desc: {
        type: Sequelize.STRING
      }

    })

    // Create Pods Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var pod = sequelize.define('pods', {
      pod_id: {
        type: Sequelize.INTEGER,
      }
      current_weight: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      max_weight: {
        type: Sequelize.INTEGER,
      },
      last_maintain:{
        createdAt: true,
      }

    })

    // Create status Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var status = sequelize.define('status', {
      status_type: {
        type: Sequelize.STRING
      }
    })

    // Create Shipment Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var shipment = sequelize.define('shipments', {})

    //Create Shipment_Unit table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var shipment_unit = sequelize.define('shipment_units', {
      ship_id: {
        type: Sequelize.INTEGER,
      }
      sku:{
        type:Sequelize.INTEGER,
      },
      qty:{
        type:Sequelize.INTEGER,
      }
    })

    // Create Shipment Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var shipment_method = sequelize.define('shipment_methods', {})

    // Create unit_pods Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var order_unit = sequelize.define('order_units', {
      sku:{
        type:Sequelize.INTEGER
      },
      qty:{
        type:Sequelize.INTEGER
      }
    })

    // Inventory Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var inventory = sequelize.define('inventory', {
      sku:{
        type:Sequelize.INTEGER.
      },
      status:{
        type:Sequelize.STRING,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      pod_id: {
        type: Sequelize.INTEGER,
      }

    })

    // Package Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var package = sequelize.define('packages', {
      pkg_id:{
        type:Sequelize.INTEGER.
      },
      order_id:{
        type:Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },

    })
    // Package_Units Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var package_unit = sequelize.define('package_units', {
      pkg_id:{
        type:Sequelize.INTEGER.
      },
      order_id:{
        type:Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },

    })
     // Maintence Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var maint_req = sequelize.define('maint_req', {
      pod_id:{
        type:Sequelize.INTEGER.
      },
      type:{
        type:Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },

    })
    // Recipients Table
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    var recipient = sequelize.define('recipients', {
      name:{
        type:Sequelize.INTEGER.
      },
      address:{
        type:Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      }


    })
    // Table Relations
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    job_relation.belongsTo(order);
    order.hasMany(job_relation);

    job_relation.belongsTo(worker);
    worker.hasMany(job_relation);

    job_relation.belongsTo(job);
    job.hasMany(job_relation);

    job_relation.belongsTo(status);
    status.hasMany(job_relation);

    order.belongsTo(unit_pod);
    unit_pod.hasMany(order);

    order.belongsTo(status);
    status.hasMany(order);


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
        job_relation: job_relation,
        status: status,
        unit_description: unit_description,
        unit_pod: unit_pod
      };
  }
