// Gravity Application API  status/inspecting | API for returning orders with status of inspecting
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

module.exports = function (express){
  var router = express.Router();
  var unit = require('../../../../../models/unit.js');

  // Route to '/inspecting'
  router.post('/inspecting', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    unit.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 600, if so console.log the total orders.
      if (status === 600){
        console.log('Total units: ' + data.length + '.');
        res.json({
          serverMessage: 'Your units are: ',
          orders: data,
          serverResponse: 'Total units: ' + data.length
        });
      } else {
        res.json({
          serverMessage: 'None were found.'
        });
        console.log('Sorry, none found');
      }
    }, function(err){
      console.log('err' + err);
    });
  });
  return router;
};
