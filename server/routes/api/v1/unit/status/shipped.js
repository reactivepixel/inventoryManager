// Pulling all orders that are marked as 'shipped'
/*
* To test this enter {"statusId": 200}
* and you should recieve back the data and total number of orders
*/

module.exports = function (express){
  var router = express.Router();
  var unit = require('../../../../../models/unit.js');

  // Route to '/shipped'
  router.post('/shipped', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    unit.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 300, if so console.log the total orders.
      if (status === 200){
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
