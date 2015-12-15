// Gravity Application API | Create a worker in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var worker = require('../../../../models/worker.js');

  // /api/v1/worker/create
  router.post('/create', function(req, res) {
    var serverMessage = "Your worker is being created";
    var serverResponse = "Your worker was created successfully";

    // Request made from client
    var clientWorkerPost = req.body;

    // Example of data in JSON format
    // worker.add({name: 'Muffin Man'}
    worker.create({name: clientWorkerPost.name},
    function(data){

      // Server message of the request
      console.log('A worker create request has been made');

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
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