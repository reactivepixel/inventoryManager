// Pulling all orders that are marked as 'shipping'

module.exports = function(router){
  var router = express.Router();
  var order = require('../../../../models/order.js');

  router.post('/shipping', function(req, res){
    var statusShipping = [];
    var totalShiping = statusShipping.length;
    var statusInfo = req.body;

    order.all(function(data){
      var status = statusInfo.statusId;
      if (status === 700){
        statusShipping.push(data);
      }
      res.json(data);
    }, function(err){
      console.log('err' + err);
    });
  });
  return router;
};
