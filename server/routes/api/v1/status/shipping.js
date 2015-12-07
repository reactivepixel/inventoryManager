// Gravity Application API statusPicking| API endpoint for order status Shipping
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');
  
  // http://localhost:3000/api/v1/status/shipping
  router.post("/shipping" , function(req, res){
  	var ordersShipping = [];

  });
  };