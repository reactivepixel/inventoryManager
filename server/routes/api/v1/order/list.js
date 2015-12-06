// Gravity Application API orderList| API showing the sample database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();
  var database = require('./../database.js');

  // http://localhost:3000/api/v1/order/list
  // returns to client a json object of the database
  router.get('/list', function(req, res) {
    res.json(database);
  });

  return router;
};


