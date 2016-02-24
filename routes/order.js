'use strict';
module.exports = function(express) {

// Config
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../server/db.js');
let orderedItems = db.orderedItems;
let orders = db.orders;

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

    data.uuid = uuid_generator.generateUUID();
    data.timestamp = timestamp.makeTimestamp();

    orders.create(data, function(err) {
      res.status(500).json(err);
    }, function(data) {
      orderedItems.create(data, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      })
    })
  });

return router;

};
