module.exports = function (express) {
  const fs = require('fs');

  // Config
  const router = express.Router();

  // Display altered data
  router.get('/', function(req,res){
    res.json(data);
  });
  return router;
};
