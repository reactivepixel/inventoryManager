// Gravity Application API orderCreate | API for adding order to database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var order = require('../../../../models/order.js');

  // /api/v1/order/create
  router.post('/create', function(req, res) {
    var serverMessage = "Your order is being created";
    var serverResponse = "Your order was created successfully";

    // Request made from client
    var clientOrderPost = req.body;
    console.log(clientOrderPost);

    // Example of data in JSON format
    // {"name" : "Jazy Jasilo", "address": "555 jazy lane","city": "Jazy Town","state": "JZ", "zip": 32730, "phone": 555555555}

    order.create({
      name: clientOrderPost.name,
      address: clientOrderPost.address,
      city: clientOrderPost.city,
      state: clientOrderPost.state,
      zip: clientOrderPost.zip,
      phone: clientOrderPost.phone
    }, function (data) {
      // Server message of the request
      console.log('A order create request has been made');
      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        orderId: data
      })
    },

    function(err){
      res.json({
        serverMessage: serverMessage,
        serverResponse: "You've encountered an unknown error",
        serverError: err
      });
    });
  });

  return router;

};