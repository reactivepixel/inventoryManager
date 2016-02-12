module.exports = function (express) {
  const router = express.Router();
  const data = {order:{sku: ['a5296ab9-9eee-7ba0-0a79-b801594f2c91'],quantity: 1,recipients: {name: 'John Doe',address: {street: '3300 University Blvd',city: 'Winter Park',state: 'FL',zip: '32792'},phone: '555-555-5555',email: 'jdoe@gmail.com'}}};

  // Include uuid generator and timestamp generator
  const uuid_generator = require('../src/uuid-generator.js');
  const timestamp = require('../src/timestamp.js');

  // Add uuid and timestamp to json data
  data.order.uuid = uuid_generator.uuid();
  data.order.timestamp = timestamp.toTimestamp();

  router.get('/', function(req,res){
    res.json(data);
  });
  return router;
};
