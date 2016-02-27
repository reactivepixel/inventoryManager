'use strict';
module.exports = function(express) {
  const router = express.Router();
  let inventory = require('../models/inventory.js');
  const db = require('../server/db.js');
  
  const timestamp = require('../server/timestamp.js');
  
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
    
     // generating timestamp and adding it to the payload data
    data.timestamp = timestamp.makeTimestamp();
    
    function(callback) {
      // Create the inventory passing through the payload data
        inventory.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(createdInventory) {
          // pass the createdOrder to the next fn() to be able to access the uuid
          callback(null, createdInventory);
        })
      },
      function(createdInventory, callback) {
        // Find the newly created inventory passing through the createdInventory from the previous fn()
        orders.find(createdInventory, function(e) {
          res.status(500).json({error: e});
        }, function(foundInventory) {
          // pass the foundInventory to the next fn() to still be able to access the uuid later on
          callback(null, foundInventory);
        });
      },
  })
  return router;
}