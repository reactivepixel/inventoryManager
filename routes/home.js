'use strict';
module.exports = function (express) {

  // Config
  const router = express.Router();

  // Display altered data
  router.get('/', function(req,res){
    res.send('Homepage');
  });
  return router;
};
