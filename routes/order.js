'use strict';
module.exports = function (express) {

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

    // .put(function(req, res) {
    //   var data = req.body;
    //   // adding generated UUID and timestamp to the json data
    //   data.uuid = uuid_generator.generateUUID();
    //   data.timestamp = timestamp.makeTimestamp();
    //   // ending the response and console logging the response data
    //
    //   // Creating the order in the database based on the request
    //   orders.build({
    //     orderId: data.uuid,
    //     fullName: data.recipient.name,
    //     streetAddress: data.recipient.address.street,
    //     city: data.recipient.address.city,
    //     state: data.recipient.address.state,
    //     zip: data.recipient.address.zip,
    //     phone: data.recipient.phone,
    //     email: data.recipient.email,
    //     timeStamp: data.timestamp
    //   },
    //
    //   // Success function
    //     function(data) {
    //       console.log('An order has been created.');
    //       res.json(data);
    //     },
    //
    //   // Error function
    //     function(error) {
    //       console.log('You\'ve encountered an error.');
    //       res.json(error);
    //     }).save();
    //
    //
    //   // Creating the ordered items based on how many objects are inside of the units array
    //   for (let i = 1; i <= data.units.length; i++) {
    //     orderedItems.build({
    //       sku: data.units.sku,
    //       orderId: data.uuid,
    //       quantity: data.units.quantity
    //     },
    //   // Success function
    //     function(data) {
    //       console.log('An orderedItem has been created.');
    //     },
    //
    //   // Error function
    //     function(error) {
    //       console.log('You\'ve encountered an error.');
    //     }).save()
		// 	};
    //
    //
    //   });

      // Creating the order in the database based on the request
      orders.build({
        orderId: data.uuid,
        fullName: data.recipient.name,
        streetAddress: data.recipient.address.street,
        city: data.recipient.address.city,
        state: data.recipient.address.state,
        zip: data.recipient.address.zip,
        phone: data.recipient.phone,
        email: data.recipient.email,
        timeStamp: data.timestamp
      },
      // Success function
        function(data) {
          console.log('An order has been created.');
        },

      // Error function
        function(error) {
          console.log('You\'ve encountered an error.');
        }).save();



    .put(function(req, res) {
      orders.create({
        orderId: data.uuid,
        fullName: data.recipient.name,
        streetAddress: data.recipient.address.street,
        city: data.recipient.address.city,
        state: data.recipient.address.state,
        zip: data.recipient.address.zip,
        phone: data.recipient.phone,
        email: data.recipient.email,
        timeStamp: data.timestamp
      })
      .on('success', function(data) {
        for (let i = 1; i <= data.units.length; i++) {
          orderedItems.create({
            sku: data.units[i].sku,
            orderId: data.uuid,
            quantity: data.units[i].quantity
        })}
        .on('success', function(data) {
          res.json(data);
        })
        .catch(function() {
          res.json({
            success: false,
            desc: 'Order was created but orderedItems creation failed'
            statusCode: 500
          })
      })

      })

      })
    });

  return router;
};
