module.exports = function (express) {
  var router = express.Router();

  router.get('/', function( req, res) {
    res.json({msg:'Hello World'});
  });

  router.post('/order/new', function( req, res) {

    // TODO: Save payload information to the database
    var payload = req.body;
    console.log('I should probably save this to a database.', payload);

    // Response to Client
    res.json({
      code: {id:201, title:'Success Receipt of Post Data'},
      reqBody: payload
    });
  });

  return router;
};
