// Gravity Application API | Find pod based on SKU
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var pod = require('../../../../models/pod.js');

  // /api/v1/pod/find
  router.post('/find', function(req, res) {
    var serverMessage = "Your find request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {"pod_id" : "j9fead89099de0cf88ce52bf794e5a47e"}
    pod.find({pod_id: clientFindPost.pod_id},
    function(data) {

      // Server message of the request
      console.log('A find request has been made for pod: ' + clientFindPost.pod_id);

      // Check data
      if(data == null) {
        // If data doesn't have a result
        serverResponse = "Your find request for pod id: " + clientFindPost.pod_id + " was not found"
      }else {
        // If data returns positive
        serverResponse = "Your find request for pod id: " + clientFindPost.pod_id + " was located"
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