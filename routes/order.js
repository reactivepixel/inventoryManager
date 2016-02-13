module.exports = function (express) {

  // Config
  const router = express.Router();

  // Display
  router.get('/', function(req,res){
    res.send('This is the order route');
  });
  return router;
};
