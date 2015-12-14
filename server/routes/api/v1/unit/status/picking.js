// Gravity Application API status/picking | API for returning orders with status picking
// Pulling all units that are marked as 'shipping'
/*
* To test this enter {"statusId": 100}
* and you should recieve back the data and total number of units
*/

module.exports = function (express){
  var router = express.Router();
  var unit = require('../../../../../models/unit.js');

  // Route to '/picking'
  router.post('/picking', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    unit.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 100, if so console.log the total orders.
      if (status === 100){
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
