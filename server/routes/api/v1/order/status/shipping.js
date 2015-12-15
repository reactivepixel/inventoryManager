// Pulling all orders that are marked as 'shipping'
/*
* To test this enter {"statusId": 105}
* and you should recieve back the data and total number of orders
*/

module.exports = function (express){
  var router = express.Router();
  var order = require('../../../../../models/order.js');

  // Route to '/api/v1/order/status/shipping'
  router.post('/shipping', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    order.find({status: statusInfo.status}, function(data){
      var status = statusInfo.status;

      // Check if the status is 105, if so console.log the total orders.
      if (status === 105){
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
