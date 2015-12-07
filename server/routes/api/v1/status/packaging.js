// Gravity Application API statusPackaging| API endpoint for order status Packaging
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  //Not yet connected to database, so we're using the sample database here
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/status/packaging
  router.post("/packaging" , function(req, res){
  	var ordersPackaging = [];

  });
  };