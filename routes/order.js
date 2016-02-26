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
    let serverError;

    // console.log(data);

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    var savedData = {};

    orders.create(data, function(err) {
      serverError = true;
    }, function(order) {
      savedData = order.dataValues;
      savedData.units = [];
      orderedItems.create(data, function(err) {
        serverError = true;
      }, function(completedOrder) {
        serverError = false;
        savedData.units.push(completedOrder.dataValues);
      });
    });

    console.log(savedData);

    if(serverError) {
      res.status(500).json(serverError);
    } else{
      savedData = orders.find(data, function(err) {
        res.status(500).json(err);
      }, function(foundOrder) {
        res.status(200).json(foundOrder);
      });
    }

  });

return router;

};
