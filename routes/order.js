'use strict';
module.exports = function(express) {

// Config
const router = express.Router();
let orderedItems = require('../models/ordered-items.js');
let orders = require('../models/orders.js');

// Include uuid generator and timestamp generator
const uuid_generator = require('../server/uuid-generator.js');
const timestamp = require('../server/timestamp.js');

// Display
router.route('/')
  .get(function(req, res) {
    let data = req.body;
    orders.findAll(function(err) {
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  .put(function(req, res) {
    let data = req.body;
    let serverError;

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    var savedData = {};


    orders.create(data, function(err) {
      // serverError = true;
    }, function(order) {
      savedData = order.dataValues;
      savedData.units = [];
      orderedItems.create(data, function(err) {
        // serverError = true;
      }, function(completedOrder) {
        // serverError = false;
        savedData.units.push(completedOrder.dataValues);
        var foundData = orders.find(data, function(err) {
          res.status(500);
        }, function(foundOrder) {
          res.status(200).json(foundOrder);
        })
      });
    });

/*
    if(serverError) {
      res.status(500).json(serverError);
    } else{
      savedData = orders.find(data, function(err) {
        res.status(500).json(err);
      }, function(foundOrder) {
        res.status(200).json(foundOrder);
      });
    }
*/

  });

return router;

};
