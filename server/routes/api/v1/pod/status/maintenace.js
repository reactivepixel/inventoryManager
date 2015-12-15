// Gravity Application API  status/maintenance | API for returning pods with status of maintenance
// Pulling all units that are marked as 'maintenance'
/*
* To test this enter {"statusId": 601}
* and you should recieve back the data and total number of pods
*/

module.exports = function (express){
  var router = express.Router();
  var pod = require('../../../../../models/pod.js');

  // Route to '/api/v1/pod/status/maintenance'
  router.post('/maintenance', function(req, res){
    var statusInfo = req.body;

    // Find by status using the find model
    pod.find({statusId: statusInfo.statusId}, function(data){
      var status = statusInfo.statusId;

      // Check if the status is 601, if so console.log the total pods
      if (status === 601){
        console.log('Total pods: ' + data.length + '.');
        res.json({
          serverMessage: 'Your pods are: ',
          pods: data,
          serverResponse: 'Total pods: ' + data.length
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
