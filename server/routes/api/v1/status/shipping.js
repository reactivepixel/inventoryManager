// Call upon the find one function
// Gravity Application API orderFind | API for locating an order by orderID
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();

  // http://localhost:3000/api/v1/order/shipping
  router.post('/shipping', function(req, res) {
    order.findOne({status.responseCode: 700}, function(data){
     res.json(data);
    }, function(err, doc){
     console.log('err' + err + doc);
    });
  });

  return router;
};
