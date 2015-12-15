// Gravity Application API | Update a worker in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var worker = require('../../../../models/worker.js');

  // /api/v1/worker/update
  router.post('/update', function(req, res) {
    var serverMessage = "Your update is being processed";
    var serverResponse = "Your worker was updated successfully";

    // Request made from client
    var clientPodPost = req.body;

    // Example of data in JSON format
    // worker.update({name:'Muffin Man'}
    worker.update({name: clientPodPost.name},
    function(data){

      // Server message of the request
      console.log('A worker update request has been made');

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