// npm modules

require('dotenv').load();

var express 	  = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    env 		    = process.env,
    mysql       = require('mysql');
    Sequelize  	= require('sequelize');

// Config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var port = env.PORT || 3000;

var sequelize = new Sequelize(env.DB_NAME, env.MYSQL_NAME, env.MYSQL_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

//Checking connection status
var test = sequelize.authenticate().then(function(){
    console.log("connected");
  }).catch(function(err){
    console.log("something goofed", err);
  })
  .done()


//Create Orders Table

var Orders = sequelize.define('orders', {
  order_id: {
    type: Sequelize.BIGINT(11),
    field: 'order_id',
    primaryKey: true,
    autoIncrement: true 
  },
  time_stamp: {
    type: Sequelize.STRING,
    createdAt: true
  },
  recipient: {
    type: Sequelize.STRING,
  },
  unit_id: {
    type: Sequelize.STRING,
  }

});
//Create Units Table

var Units = sequelize.define('units', {
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

//Create Workers Table

var Workers = sequelize.define('workers', {
  worker_id: {
    type: Sequelize.INTEGER,
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

//Create Jobs Table

var Jobs = sequelize.define('jobs', {
  job_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  job_desc: {
    type: Sequelize.STRING
  },

})

//Create Pods Table

var pods = sequelize.define('pods', {
  pod_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  current_weight: {
    type: Sequelize.INTEGER
  },

})

//Create job_relations Table

var job_relations = sequelize.define('job_relations', {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  worker_id: {
    type: Sequelize.INTEGER
  },
  job_id: {
    type: Sequelize.INTEGER
  },
  status_id: {
    type: Sequelize.INTEGER
  },

  // classMethods: {
  //   associate: function(models){
  //     Orders.belongsTo(models.Orders)
  //   }
  // }

})

//Create status Table
var status = sequelize.define('status', {
  status_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  status_type: {
    type: Sequelize.STRING
  }
})

//Create unit_description Table
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
var unit_pods = sequelize.define('unit_pods', {
  pod_id:{
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  sku:{
    type:Sequelize.INTEGER
  },
  qty:{
    type:Sequelize.INTEGER
  }
})

sequelize.sync();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Version 1 of the API
app.use('/api/v1', require('./routes/api/v1.js')(express));


// START THE SERVER
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var server = app.listen(port);
