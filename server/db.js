module.exports = function(){
var express     = require('express'),
    app         = express(),
    env         = process.env,
    mysql       = require('mysql'),
    Sequelize   = require('sequelize');

// Config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var sequelize = new Sequelize(env.DB_NAME, env.MYSQL_NAME, env.MYSQL_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  port:8889,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
//Checking connection status
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var test = sequelize.authenticate().then(function(){
    console.log("connected");
  }).catch(function(err){
    console.log("something goofed", err);
  })
  .done()

//Create Tables
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var order = sequelize.define('orders', {
  time_stamp: {
    type: Sequelize.STRING,
    createdAt: true
  },
  recipient: {
    type: Sequelize.STRING,
  },
  

});
//Create Units Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var unit = sequelize.define('units', {
  sku: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  qty_on_hand: {
    type: Sequelize.INTEGER,
  },
  trigger_qty: {
    type: Sequelize.INTEGER,
  },
  replenish_qty: {
    type: Sequelize.INTEGER,
  }

})

//Create worker Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var worker = sequelize.define('workers', {
  qty_on_hand: {
    type: Sequelize.INTEGER,
  },
  trigger_qty: {
    type: Sequelize.INTEGER,
  },
  replenish_qty: {
    type: Sequelize.INTEGER,
  }

})

//Create Jobs Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var job = sequelize.define('jobs', {
  job_desc: {
    type: Sequelize.STRING
  },

})

//Create Pods Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var pod = sequelize.define('pods', {
  current_weight: {
    type: Sequelize.INTEGER
  },

})

//Create job_relations Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var job_relation = sequelize.define('job_relation', {})

//Create status Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var status = sequelize.define('status', {
  status_type: {
    type: Sequelize.STRING
  }
})

//Create unit_description Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var unit_description = sequelize.define('unit_description', {
  sku:{
    type:Sequelize.INTEGER,
    primaryKey: true
  },
  description:{
    type: Sequelize.STRING
  },
  weight:{
    type:Sequelize.INTEGER
  }
})

//Create unit_pods Table
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var unit_pod = sequelize.define('unit_pods', {
  sku:{
    type:Sequelize.INTEGER
  },
  qty:{
    type:Sequelize.INTEGER
  }
})

//table relations
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

//Creating all the tables in the proper orders
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

sequelize.sync(); // push all tables to database


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
  }
}
