'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let units = require('../models/units.js');
  const db = require('../server/db.js');

  const timestamp = require('../server/timestamp.js');

  router.route('/')

  //Get request to access all records in database.
  .get(function(req, res) {
    units.findAll(function(err) {
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

    var savedData = {};

    async.waterfall([
      function(callback) {
        // Create the unit passing through the payload data
        units.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(createdUnit) {
          // pass the createdUnit to the next fn()
          callback(null, createdUnit);
        })
      },
      function(createdUnit, callback) {
        // Find the newly created unit passing through the createdUnit from the previous fn()
        units.find(createdUnit, function(e) {
          res.status(500).json({error: e});
        }, function(foundUnit) {
          // Construct the final json object for the response
          savedData = foundUnit.dataValues;
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
    })
  })

  return router;
}
