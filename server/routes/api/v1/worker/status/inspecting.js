// Gravity Application API  status/inspecting | API for returning workers with status of inspecting
/*
* To test this enter {"statusId": 402 }
* and you should recieve back the data and total number of workers in inspecting
*/

module.exports = function (express){
  var router = express.Router();
  var worker = require('../../../../../models/worker.js');

  // Route to '/api/v1/order/status/inspecting'
  router.post('/inspecting', function(req, res){
    var statusInfo = req.body;

    // Find status using the find model
    worker.find({statusId: statusInfo.status}, function(data){
      var status = statusInfo.status;

      // Check if the status is 402, if so console.log the total workers
      if (status === 402){
        console.log('Total workers in Inspecting: ' + data.length + '.');
        res.json({
          serverMessage: 'Workers: ',
          workers: data,
          serverResponse: 'Total workers in Inspecting: ' + data.length
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
