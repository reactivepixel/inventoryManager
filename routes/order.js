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

  //Get request to access all records in database.
  .get(function(req, res) {
    let data = req.body;

    orders.findAll(function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Put request to create a record in database.
  .put(function(req, res) {
    let data = req.body;
    let serverError;

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    var savedData = {};

    orders.create(data)

/*
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
          //Encoutered an error.
          res.status(500);
        }, function(foundOrder) {
          res.status(200).json(foundOrder);
        })
      }); // End of orderedItems.create
    }); // End of orders.create
  }); // End of PUT route
*/
router.route('/:uuid')

  //Put request to update a record in the database.
  .put(function(req, res) {
    req.body.uuid = req.params.uuid;
    orders.update(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Get request to read one record from the database.
  .get(function(req, res) {
    req.body.uuid = req.params.uuid;
    orders.find(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Delete reuqest to remove one record from database.
  .delete(function(req, res) {
    req.body.uuid = req.params.uuid;
    orders.destroy(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({success: data});
    })
  })

return router;

};







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
