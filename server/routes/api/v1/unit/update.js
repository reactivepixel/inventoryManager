// Gravity Application API | Update a unit in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var unit = require('../../../../models/unit.js');

  // /api/v1/unit/update
  router.post('/update', function(req, res) {
    var serverMessage = "Your update is being processed";
    var serverResponse = "Your unit was updated successfully";

    // Request made from client
    var clientUnitPost = req.body;

    // Example of data in JSON format
    // unit.update({availability_qty: j14d158c64ece48fasd00ccee895b18b8bb6, availability_qty: 3}
    unit.update({sku: clientUnitPost.sku, availability_qty: clientUnitPost.availability_qty},
    function(data){

      // Server message of the request
      console.log('A unit update request has been made');

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