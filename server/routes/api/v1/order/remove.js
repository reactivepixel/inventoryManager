// Gravity Application API orderRemove| API showing the sample database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var router = express.Router();
  var order = require('../../../../models/order.js');

  // /api/v1/order/remove
  router.post('/remove', function(req, res) {
    var serverMessage = "Your remove request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {"sku" : "j9fead89099de0cf88ce52bf794e5a47e"}
    order.remove({sku: clientFindPost.sku},
    function() {

      // Server message of the request
      console.log('A remove request has been made for order: ' + clientFindPost.sku);
      serverResponse = "Your remove request for sku: " + clientFindPost.sku + " was proceeded";

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse
      });
    },

    function(err, doc){
      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        ServerError: err + doc
      });
    });
  });

  return router;
};