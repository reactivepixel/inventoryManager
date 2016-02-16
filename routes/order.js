module.exports = function (express) {

  // Config
  const router = express.Router();

  // Include uuid generator and timestamp generator
  const uuid_generator = require('../server/uuid-generator.js');
  const timestamp = require('../server/timestamp.js');

  // Display
  router.route('/')
    .get(function(req, res) {
      res.send('Making PUT request to /order');
    })

    .put(function(req, res, body) {
      var data = req.body;

      

      // adding generated UUID and timestamp to the json data
      data.uuid = uuid_generator.generateUUID();
      data.timestamp = timestamp.makeTimestamp();
      // ending the response and console logging the response data
      res.send(data);
    });

  return router;
};
