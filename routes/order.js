module.exports = function (express) {

  // Config
  const router = express.Router();

  // Display
  app.route('/order')
    .get(function(req, res) {
      res.send('Making PUT request to /order');
    })
    // added json_parser to parse the request.body
    .put(json_parser, function(req, res, body) {
      const data = req.body;
      // adding generated UUID and timestamp to the json data
      data.uuid = uuid();
      data.timestamp = toTimestamp();
      // ending the response and console logging the response data
      res.end();
      console.log(data);
    });

  return router;
};
