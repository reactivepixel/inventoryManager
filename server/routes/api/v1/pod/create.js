// Gravity Application API | Create a pod in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var pod = require('../../../../models/pod.js');

  // /api/v1/pod/create
  router.post('/create', function(req, res) {
    var serverMessage = "Your pod is being created";
    var serverResponse = "Your pod was created successfully";

    // Request made from client
    var clientPodPost = req.body;

    // Example of data in JSON format
    // pod.add({current_weight: 124, max_weight: 900, last_maintain: 1200}
    pod.create({current_weight: clientPodPost.current_weight, max_weight: clientPodPost.max_weight, last_maintain: clientPodPost.last_maintain},
    function(data) {

      // Server message of the request
      console.log('A pod create request has been made');

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse
      });
    },

    function(err) {
      res.json({
        serverMessage: serverMessage,
        serverResponse: "You've encountered an unknown error",
        serverError: err
      });
    });
  });

  return router;
};