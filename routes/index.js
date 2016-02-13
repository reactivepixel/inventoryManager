module.exports = function (express) {
  const fs = require('fs');

  // Config
  const router = express.Router();



  // Include uuid generator and timestamp generator
  const uuid_generator = require('../src/uuid-generator.js');
  const timestamp = require('../src/timestamp.js')();


  // Display altered data
  router.put('/order', function(req,res){


      // Unaltered data
    var data = req.body;

    // Add uuid and timestamp to json data
    // data.uuid = uuid_generator.uuid();
    // data.timestamp = timestamp.toTimestamp();


    res.json({healthy: true});
  });
  return router;
};
