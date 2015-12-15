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

    // Example of data in JSON format
    // order.add({shipping_tracking: 1234}
    order.add({shipping_tracking: clientOrderPost.shipping_tracking},
    function(data){

      // Server message of the request
      console.log('A order create request has been made');

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse
      });
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