// Gravity Application API | Create a unit in the database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var unit = require('../../../../models/unit.js');

  // /api/v1/unit/create
  router.post('/create', function(req, res) {

    // request made from client
    var clientUnitPost = req.body;

    // example of data in JSON format
    // {"qty_on_hand" : 7, "trigger_qty" : 10 : "replenish_qty" : 5}
    unit.add({qty_on_hand: clientUnitPost.qty_on_hand, trigger_qty: clientUnitPost.trigger_qty, replenish_qty: clientUnitPost.replenish_qty},
      function(data){

        // server message of the request
        console.log('A unit create request has been made');

        res.json({
          serverMessage: "Your unit is being created",
          serverResponse: "Your unit was created successfully, your SKU is: ",
          unitSKU: data.sku
        });
      },

      function(err){
        serverMessage = "Your unit is being created";
        ServerResponse = err
    });
  });

  // sent route back to server.js
  return router;
};
