// Gravity Application API orderUpdate | API for adding order to database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var order = require('../../../../models/order.js');

  // /api/v1/order/update
  router.post('/update', function(req, res) {
    var serverMessage = "Your update is being processed";
    var serverResponse = "Your order was updated successfully";

    // Request made from client
    var clientOrderPost = req.body;

    // Example of data in JSON format
    // order.update({shipping_tracking:1709}
    order.update({shipping_tracking: clientOrderPost.shipping_tracking},
    function(data){

      // Server message of the request
      console.log('A order update request has been made');

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        orderData: data
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