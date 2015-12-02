module.exports = function (express) {

  var router = express.Router();


  console.log('orderAPI loads');
  var robotDatabase = [
    {robotId: 1000, status: 'Delivering', timestamp : Math.floor(Date.now() / 1000)},
    {robotId: 1001, status: 'Returning', timestamp : Math.floor(Date.now() / 1000)},
    {robotId: 1002, status: 'Defective', timestamp : Math.floor(Date.now() / 1000)},
    {robotId: 1003, status: 'recharging', timestamp : Math.floor(Date.now() / 1000)}
  ];

  //static data model
  router.get('/', function( req, res) {

    res.json(robotDatabase);
  });

  //find specific robot
  // FIXME: parameter not recognized
  router.get('/pRobotID?', function( req, res) {

    var parameter = req.params.pRobotID;
    res.json(robotDatabase.parameter);
  });

  return router;
};
