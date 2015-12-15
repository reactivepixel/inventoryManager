// Gravity Application API  status/packaging | API for returning workers with status of packaging
/*
* To test this enter {"statusId": 300 }
* and you should recieve back the data and total number of workers in packaging
*/

module.exports = function (express){
  var router = express.Router();
  var worker = require('../../../../../models/worker.js');

  // Route to '/api/v1/order/status/packaging'
  router.post('/packaging', function(req, res){
    var statusInfo = req.body;

    // Find status using the find model
    worker.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 300, if so console.log the total workers
      if (status === 300){
        console.log('Total workers in Packaging: ' + data.length + '.');
        res.json({
          serverMessage: 'Workers: ',
          workers: data,
          serverResponse: 'Total workers in Packaging: ' + data.length
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