// Gravity Application API statusInspecting| API endpoint for order status Inspecting
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/status/inspecting
  router.post("/inspecting" , function(req, res){
  	var serverMessage = '';
  	var ordersInspecting = [];
  	var totalInspecting = ordersInspecting.length;

  	var statusRequest = req.body;
  	var status = statusRequest.tracking.status;
  	
  	if(database[status] == "undefined" || database[status] == undefined){
      serverMessage = "No orders with " + status + " status found."
    }else{
    	//push all orders with matching status to ordersInspecting
    	
    }
    //return array of orders with matching status
    res.json(ordersInspecting);
    res.send(totalInspecting);

  });
  	return router;
  };