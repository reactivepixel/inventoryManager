// Gravity Application API | Create a unit in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var unit = require('../../../../models/unit.js');

  // /api/v1/unit/create
  router.post('/create', function(req, res) {
    var serverMessage = "Your unit is being created";
    var serverResponse = "Your unit was created successfully, your SKU is: ";

    // Request made from client
    var clientUnitPost = req.body;

    // Example of data in JSON format
    //unit.create({available_qty: 3, trigger_qty:4, replenish_qty:5, description: "pink", weight_lbs: 4});
    unit.create({statusId:clientUnitPost.statusId, available_qty: clientUnitPost.available_qty, trigger_qty: clientUnitPost.trigger_qty, 
      replenish_qty: clientUnitPost.replenish_qty, description: clientUnitPost.description, 
      weight_lbs: clientUnitPost.weight_lbs},
    function (data) {

      // Server message of the request
      console.log('A unit create request has been made');

      res.json({
        serverMessage: serverMessage,
        serverResponse: serverResponse,
        unitSKU: data.sku
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