'use strict';
module.exports = function(express) {

// Config
const router = express.Router();
// const Sequelize = require('sequelize');
// const db = require('../server/db.js');
let orderedItems = require('../models/ordered-items.js');
let orders = require('../models/orders.js');

// Include uuid generator and timestamp generator
const uuid_generator = require('../server/uuid-generator.js');
const timestamp = require('../server/timestamp.js');

// Display
router.route('/')
  .get(function(req, res) {
    res.send('Making PUT request to /order');
  })

  .put(function(req, res) {
    let data = req.body;
    let successMsg;
    let error;

    // console.log(data);

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    /*orders.create(data, function(err) {
      error = 'Encountered an error while creating Order.';
    }, function(order) {
      successMsg = 'Order was successfully created.';
    });

    orderedItems.create(data, function(err) {
      error = 'Encountered an error while creating Ordered It.';
    }, function(order) {
      successMsg = 'Ordered Item was successfully created.';
    });*/

    orders.create(data, function(err) {
      res.status(500).json(err);
    }, function(order) {
      orderedItems.create(order, function(err) {
        res.status(500).json(err);
      }, function(completedOrder) {
        successMsg = 'Orders and Ordered Item was successfully created.';
        res.status(200).json(completedOrder);
      });
    });


    /*if(error) {
      res.status(500).json(error);
    } else{
      res.status(200).json(data);
    }*/

  });

return router;

};
