// Gravity Application API orderFind | API for locating an order by orderID
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var order = require('../../../../models/order.js');

  // /api/v1/order/find
  router.post('/find', function(req, res) {
    var serverMessage = "Your find request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {shipping_tracking:1600}
    order.findOne({shipping_tracking: clientFindPost.shipping_tracking},
    function(data) {

      // Server message of the request
      console.log('A find request has been made for order: ' + clientFindPost.shipping_tracking);

      // Check data
      if(data == null) {
        // If data doesn't have a result
        serverResponse = "Your find request for shipping tracking: " + clientFindPost.shipping_tracking + " was not found"
      }else {
        // If data returns positive
        serverResponse = "Your find request for shipping tracking: " + clientFindPost.shipping_tracking + " was located"
      }

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        unitData: data
      });
    },

    function(err){
      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        ServerError: err
      });
    });
  });

  return router;
};