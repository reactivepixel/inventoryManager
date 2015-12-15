// Gravity Application API | Remove worker based on SKU
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var worker = require('../../../../models/worker.js');

  // /api/v1/worker/remove
  router.post('/remove', function(req, res) {
    var serverMessage = "Your remove request is being processed";
    var serverResponse = "You've encountered an unknown error";

    // Request made from client
    var clientFindPost = req.body;

    // Example of data in JSON format
    // {name:'Muffin Man'}
    worker.remove({name: clientFindPost.name},
    function() {

      // Server message of the request
      console.log('A remove request has been made for worker: ' + clientFindPost.name);
      serverResponse = "Your remove request for worker id: " + clientFindPost.name + " was proceeded";

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