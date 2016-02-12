module.exports = function (express) {
  const router = express.Router();

  router.get('/order', function(req,res){
    res.send('This is the order route');
  });
  return router;
};
