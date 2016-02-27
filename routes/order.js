'use strict';
module.exports = function(express) {

// Config
const router = express.Router();
const async = require('async');
let orderedItems = require('../models/ordered-items.js');
let orders = require('../models/orders.js');
const db = require('../server/db.js');

// Include uuid generator and timestamp generator
const uuid_generator = require('../server/uuid-generator.js');
const timestamp = require('../server/timestamp.js');

// Display
router.route('/')

  //Get request to access all records in database.
  .get(function(req, res) {
    orders.findAll(function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Put request to create a record in database.
  .put(function(req, res) {
    // payload data is the request body
    let data = req.body;

    // generating uuid and timestamp and adding them to the payload data
    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    // declaring variable for the retrieved data from the db
    var savedData = {};
    savedData.units = [];

    /*
     *
     * Async.waterfall() Quick Tip:
     *
     * The functions run in sequential order since some fn() are dependant on other fn()
     *
     * The .waterfall() method passes the result of the fn() in the callback(null, result)
     * There can be more than one result added inside of the callback
     * ex: callback(null, result1, result2, result3...);
     *
     * callback is the argument for every fn() except for the final fn() or if you don't
     * need to pass on any data from the previous fn()
     *
     * The results are only immediately available in the next fn()
     *
     * TODO: Find a better way to handle the errors in the async.waterfall()
     *
    */
    async.waterfall([
      function(callback) {
        // Create the order passing through the payload data
        orders.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(createdOrder) {
          // pass the createdOrder to the next fn() to be able to access the uuid
          callback(null, createdOrder);
        })
      },
      function(createdOrder, callback) {
        // Find the newly created order passing through the createdOrder from the previous fn()
        orders.find(createdOrder, function(e) {
          res.status(500).json({error: e});
        }, function(foundOrder) {
          // pass the foundOrder to the next fn() to still be able to access the uuid later on
          callback(null, foundOrder);
        });
      },
      function(foundOrder, callback) {
        // Create the orderedItems by passing through the payload data
        orderedItems.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(createdOrderedItem) {
          // pass the foundOrder to the next fn() to construct the final object
          callback(null, foundOrder);
        });
      },
      function(foundOrder, callback) {
        // Find the orderedItems passing through the foundOrder to find the matching orderedItems
        orderedItems.find(foundOrder, function(e) {
          res.status(500).json({error: e});
        }, function(foundOrderedItem) {
          // Construct the final json object for the response
          savedData = foundOrder.dataValues;
          savedData.units = foundOrderedItem;
          // pass the final json object to the final fn() handling the error / response
          callback(null, savedData);
        });
      }
    ],
    function(err, savedData) {
      // Display the error if there is one, otherwise, show the response data from the db
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(savedData);
      }
    });

  });


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

}
