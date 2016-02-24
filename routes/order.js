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
    let statusCode;
    let error;

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    orders.create(data, function(err) {
      let statusCode = 500;
      let error = err;
    }, function(data) {
      let statusCode = 200;
    });

    orderedItems.create(data, function(err) {
      let statusCode = 500;
      let error = err;
    }, function(data) {
      let statusCode = 200;    
    });

    if(statusCode == 200) {
      res.status(statusCode).json(data);
    }
    if(statusCode == 500) {
      res.status(statusCode).json(error);
    }

  });

return router;

};
