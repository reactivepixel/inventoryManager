// Gravity Application API  status/occupied | API for returning workers with status of occupied
/*
* To test this enter {"statusId": 401 }
* and you should recieve back the data and total number of occupied workers
*/

module.exports = function (express){
  var router = express.Router();
  var worker = require('../../../../../models/worker.js');

  // Route to '/api/v1/order/status/occupied'
  router.post('/occupied', function(req, res){
    var statusInfo = req.body;

    // Find status using the find model
    worker.find({statusId: statusInfo.status}, function(data){
      var status = statusInfo.status;

      // Check if the status is 401, if so console.log the total workers
      if (status === 401){
        console.log('Total workers occupied: ' + data.length + '.');
        res.json({
          serverMessage: 'Workers: ',
          workers: data,
          serverResponse: 'Total workers occupied: ' + data.length
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
