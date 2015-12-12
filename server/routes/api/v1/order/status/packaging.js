// Gravity Application API status/packaging | API for returning orders with status of packaging
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

module.exports = function (express){
  var router = express.Router();
  var order = require('../../../../../models/order.js');

  // Route to '/packaging'
  router.post('/packaging', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    order.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 300, if so console.log the total orders.
      if (status === 300){
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
