// Gravity Application API  status/inspecting | API for returning orders with status of inspecting
// Pulling all units that are marked as 'inspecting'
/*
* To test this enter {"statusId": 600}
* and you should recieve back the data and total number of units
*/

module.exports = function (express){
  var router = express.Router();
  var order = require('../../../../../models/order.js');

  // Route to '/api/v1/order/status/inspecting'
  router.post('/inspecting', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    order.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 600, if so console.log the total orders
      if (status === 600){
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
