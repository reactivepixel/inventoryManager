// Gravity Application API status/picking | API for returning orders with status picking
// Pulling all units that are marked as 'picking'
/*
* To test this enter {"status": 102}
* and you should recieve back the data and total number of units
*/
module.exports = function (express){
  var router = express.Router();
  var order = require('../../../../../models/order.js');

  // Route to '/api/v1/order/status/picking'
  router.post('/picking', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    order.find({status: statusInfo.status}, function(data){
      var status = statusInfo.status;

      // Check if the status is 102, if so console.log the total orders.
      if (status === 102){
        console.log('Total orders: ' + data.length + '.');
        res.json({
          serverMessage: 'Your orders are: ',
          orders: data,
          serverResponse: 'Total orders: ' + data.length
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
