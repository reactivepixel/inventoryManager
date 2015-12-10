// Gravity Application API | Find unit based on SKU
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var unit = require('../../../../models/unit.js');

  // /api/v1/unit/find
  router.post('/find', function(req, res) {
    var serverMessage = "Your find request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // request made from client
    var clientFindPost = req.body;


    // example of data in JSON format
    // {"sku" : "j9fead89099de0cf88ce52bf794e5a47e"}
    unit.findOne({sku: clientFindPost.sku},
    function(data) {

      // server message of the request
      console.log('A find request has been made for unit: ' + clientFindPost.sku);

      // check data
      if(data == null) {
        // if data doesn't have a result
        serverResponse = "Your find request for sku: " + clientFindPost.sku + " was not found"
      }else {
        // if data returns positive
        serverResponse = "Your find request for sku: " + clientFindPost.sku + " was located"
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

