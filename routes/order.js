'use strict';
module.exports = function (express) {

  // Config
  const router = express.Router();
  const order = require('../models/orders.js');

  // Include uuid generator and timestamp generator
  const uuid_generator = require('../server/uuid-generator.js');
  const timestamp = require('../server/timestamp.js');

  // Display
  router.route('/')
    .get(function(req, res) {
      res.send('Making PUT request to /order');
    })

    .put(function(req, res, body) {
      const data = req.body;
      // adding generated UUID and timestamp to the json data
      data.uuid = uuid_generator.generateUUID();
      data.timestamp = timestamp.makeTimestamp();
      // ending the response and console logging the response data
      // console.log(data);
      order.create({
        orderId: data.uuid,
        fullName: data.recipients.name,
        streetAddress: data.recipients.address.street,
        city: data.recipients.address.city,
        state: data.recipients.address.state,
        zip: data.recipients.address.zip,
        phone: data.recipients.phone,
        email: data.recipients.email,
        timeStamp: data.timeStamp
      }, function(data) {
        console.log('An order has been created.');
      }, function(error) {
        console.log('You\'ve encountered an error.');
      }
      });

    });

  return router;
};
