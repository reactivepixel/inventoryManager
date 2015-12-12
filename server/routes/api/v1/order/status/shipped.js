// Pulling all orders that are marked as 'shipped'
/*
* To test this enter {"statusId": 200}
* and you should recieve back the data and total number of orders
*/

module.exports = function (express){
  var router = express.Router();
  var order = require('../../../../../models/order.js');

  // Route to '/shipped'
  router.post('/shipped', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    order.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 300, if so console.log the total orders.
      // FIXME: res.json errors out due to bad object notation.
      if (status === 200){
        console.log('Total orders: ' + data.length + '.');
        res.json({
          serverMessage: 'Your orders are: ',
          data,
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
