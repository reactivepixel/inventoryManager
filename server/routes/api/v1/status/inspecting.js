// Gravity Application API statusInspecting| API endpoint for order status Inspecting
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/status/inspecting
  router.post("/inspecting" , function(req, res){
  	var ordersInspecting = [];

  });

  };