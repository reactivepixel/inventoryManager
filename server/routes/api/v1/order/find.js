// Gravity Application API orderFind | API for locating an order by orderID
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/order/find
  router.post('/find', function(req, res) {
    var serverMessage = '';
    var statusMessage = {};

    // order request from client
    var searchRequest = req.body;
    var searchId = searchRequest.orderId;


    // checking for if the requestId exsists in the database
    if(database[searchId] == "undefined" || database[searchId] == undefined){
      serverMessage = "orderId " + searchId + " doesn't exist."
    }else{
      serverMessage = "orderId " + searchId + " located";
      statusMessage = database[searchId].tracking.status
    }


    res.json({

      // JSON object sent back to client with details
      serverResponse : 'Searching for order: ' + searchId,
      serverMessage : serverMessage,
      statusMessage : statusMessage
    });
  });


  return router;
};



