// Gravity Application API orderList| API showing the sample database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var unit = require('../../../../models/unit.js');

  router.post('/create', function(req, res) {
    var responseMessage = '';
    var unitResponse = '';
    var clientUnit = req.body;


    unit.add(
      {qty_on_hand: clientUnit.qty_on_hand, trigger_qty: clientUnit.trigger_qty, replenish_qty: clientUnit.replenish_qty},
      function(data){
        unitResponse = data;
        responseMessage = 'Unit added successfully';
        console.log('Unit added successfully');

        res.json({
          responseMessage: responseMessage,
          unitResponse: unitResponse
        });
      },
      function(err){
        responseMessage = 'Adding Error' + err;
        console.log('Adding Error-' + err);
    });



  });

  return router;
};
