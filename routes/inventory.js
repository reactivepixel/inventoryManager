'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let inventory = require('../models/inventory.js');
  const db = require('../server/db.js');

  router.route('/')

  //Get request to access all records in database.
  .get(function(req, res) {
    inventory.findAll(function(err) {
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

    var savedData = {};

    async.waterfall([
      function(callback) {
        // Create the inventory passing through the payload data
        inventory.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(createdInventory) {
          // pass the createdInventory to the next fn() to be able to access the createdInventory
          callback(null, createdInventory.dataValues);
        });
      },
      function(createdInventory, callback) {
        // Find the newly created inventory passing through the createdInventory from the previous fn()
        inventory.find(createdInventory, function(e) {
          res.status(500).json({error: e});
        }, function(foundInventory) {
          // Construct the final json object for the response
          savedData = foundInventory;
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
  
  router.route('/:sku')

  //Put request to update a record in the database.
  .put(function(req, res) {
    req.body.sku = req.params.sku;
    inventory.update(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })
  
  //Get request to read one record from the database.
  .get(function(req, res) {
    req.body.sku = req.params.sku;
    inventory.find(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })
  
  //Delete reuqest to remove one record from database.
  .delete(function(req, res) {
    req.body.sku = req.params.sku;
    inventory.destroy(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({success: data});
    })
  })

  return router;
}
