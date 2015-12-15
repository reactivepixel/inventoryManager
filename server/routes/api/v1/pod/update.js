// Gravity Application API | Update a pod in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var pod = require('../../../../models/pod.js');

  // /api/v1/pod/update
  router.post('/update', function(req, res) {
    var serverMessage = "Your update is being processed";
    var serverResponse = "Your pod was updated successfully";

    // Request made from client
    var clientPodPost = req.body;

    // Example of data in JSON format
    // pod.update({pod_id:'j5061', current_weight: 124, max_weight: 900, last_maintain: 1200}
    pod.update({pod_id: clientPodPost.pod_id, current_weight: clientPodPost.current_weight, max_weight: clientPodPost.max_weight, last_maintain: clientPodPost.last_maintain},
    function(data) {

      // Server message of the request
      console.log('A pod update request has been made');

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