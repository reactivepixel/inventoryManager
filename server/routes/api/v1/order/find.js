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
    // {id:168769858}
    order.findOne({id: clientFindPost.id},
    function(data) {

      // Server message of the request
      console.log('A find request has been made for order: ' + clientFindPost.id);

      // Check data
      if(data == null) {
        // If data doesn't have a result
        serverResponse = "Your find request for shipping tracking: " + clientFindPost.id + " was not found"
      }else {
        // If data returns positive
        serverResponse = "Your find request for shipping tracking: " + clientFindPost.id + " was located"
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