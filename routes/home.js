module.exports = function (express) {

  // Config
  const router = express.Router();

  // Display altered data
  router.get('/', function(req,res){
    res.json(data);
  });
  return router;
};
