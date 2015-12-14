// Gravity Application API | Remove pod based on SKU
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var pod = require('../../../../models/pod.js');

  // /api/v1/pod/remove
  router.post('/remove', function(req, res) {
    var serverMessage = "Your remove request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {"pod_id" : "j9fead89099de0cf88ce52bf794e5a47e"}
    pod.remove({pod_id: clientFindPost.pod_id},
    function() {

      // Server message of the request
      console.log('A remove request has been made for pod: ' + clientFindPost.pod_id);
      serverResponse = "Your remove request for pod id: " + clientFindPost.pod_id + " was proceeded";

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