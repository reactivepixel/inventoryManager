module.exports = function (express) {

  // Config
  const router = express.Router();

  // Include uuid generator and timestamp generator
  const uuid_generator = require('../src/uuid-generator.js');
  const timestamp = require('../src/timestamp.js');

  // Display
  app.route('/order')
    .get(function(req, res) {
      res.send('Making PUT request to /order');
    })
    // added json_parser to parse the request.body
    .put(json_parser, function(req, res, body) {
      const data = req.body;
      // adding generated UUID and timestamp to the json data
      data.uuid = uuid_generator.uuid();
      data.timestamp = timestamp.toTimestamp();
      // ending the response and console logging the response data
      res.end();
      console.log(data);
    });

  return router;
};
