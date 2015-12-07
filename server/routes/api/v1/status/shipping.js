// Gravity Application API statusPicking| API endpoint for order status Shipping
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');
  
  // http://localhost:3000/api/v1/status/shipping
  router.post("/shipping" , function(req, res){
  	var serverMessage = '';
  	var ordersShipping = [];
  	var totalShipping = ordersShipping.length;

  	var statusRequest = req.body;
  	var status = statusRequest.tracking.status;

  	if(database[status] == "undefined" || database[status] == undefined){
      serverMessage = "No orders with " + status + " status found."
    }else{
    	//push all orders with matching status to ordersPicking
    	
    }
    //return array of orders with matching status
    res.json(ordersShipping);
    res.send(totalShipping);

  });
  
  	return router;
  };