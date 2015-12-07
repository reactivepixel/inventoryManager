// Gravity Application API statusPackaging| API endpoint for order status Packaging
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/status/packaging
  router.post("/packaging" , function(req, res){
  	var serverMessage = '';
  	var ordersPackaging = [];
  	var totalPackaging = ordersPackaging.length;

  	var statusRequest = req.body;
  	var status = statusRequest.tracking.status;
  	
  	if(database[status] == "undefined" || database[status] == undefined){
      serverMessage = "No orders with " + status + " status found."
    }else{
    	//push all orders with matching status to ordersPackaging
    	
    }
    //return array of orders with matching status
    res.json(ordersPackaging);
    res.send(totalPackaging);

  });

  	return router;
  };