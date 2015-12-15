// Gravity Application API | Find worker based on SKU
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var worker = require('../../../../models/worker.js');

  // /api/v1/worker/find
  router.post('/find', function(req, res) {
    var serverMessage = "Your find request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {name: 'Muffin Man'}
    worker.find({name: clientFindPost.name},
    function(data) {

      // Server message of the request
      console.log('A find request has been made for worker: ' + clientFindPost.name);

      // Check data
      if(data == null) {
        // If data doesn't have a result
        serverResponse = "Your find request for worker id: " + clientFindPost.name + " was not found"
      }else {
        // If data returns positive
        serverResponse = "Your find request for worker id: " + clientFindPost.name + " was located"
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