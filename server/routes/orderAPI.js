// Gravity Application Server | orderAPI
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();

  // Sample of Database Structure
  var orderDatabase = [{
    tracking : { status : 'packing', timestamp : 'today'},
    recipient : {name : 'Yanely Ramirez', address : '3300 University Blvd, Winter Park, FL 32792',  email : 'orange@fullsail.edu', phone : "555-555-5555"},
    units : [
      {unitId: 'd6a85625-5cf4-c08b-d74c-7fa0d1fbfef6', quantity : 4,
        details : {price : 2.00, name : 'teacup', stock : 100, restock : 70 }, pod : {id : '6830', status : 'charging'}},
      {unitId: '4a737b05-4ea1-f106-4a35-a315e57062fd', quantity : 2,
        details : {price : 4.00, name : 'teapot', stock : 100, restock : 50 }, pod : {id : '1047', status : 'inTransit'}},
      {unitId: 'fa4e2515-f1e3-0bbd-fbc2-3c9651b7374d', quantity : 2,
        details : {price : 8.00, name : 'teaset', stock : 100, restock : 30 }, pod : {id : '9702', status : 'inTransit'}}
    ]},

    {
    tracking : { status : 'packing', timestamp : 'today'},
    recipient : {name : 'Brandy Bergh', address : '3300 University Blvd, Winter Park, FL 32792', email : 'banana@fullsail.edu', phone : "555-555-5555"},
    units : [
      {unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91', quantity : 2,
        details : {price : 12.00, name : 'usbDrive', stock : 100, restock : 50 }, pod : {id : '1038', status : 'charging'}},
      {unitId: '6f013d9b-f924-f66a-2216-ed3f3472f641', quantity : 1,
        details : {price : 90.00, name : 'Computer', stock : 100, restock : 40 }, pod : {id : '9472', status : 'inTransit'}},
      {unitId: 'ed769138-f764-cceb-9309-dc3ebf17a279', quantity : 1,
        details : {price : 25.00, name : 'Keyboard', stock : 100, restock : 20 }, pod : {id : '1947', status : 'delivered'}}
    ]}
  ];
  

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  function idGenerator() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/', function( req, res) {

    // simple instructions on API paths
    // access point: http://localhost:3000/orderAPI
    res.send('<b>Order API Documentation</b>' +
      '<br><br>List Database: http://localhost:3000/orderAPI/database' +
      '<br><br>Post Search Request: http://localhost:3000/orderAPI/search' +
      '<br><br>Post Order Placement Request: http://localhost:3000/orderAPI/placement'
      );
  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/database', function(req, res) {

    // display temporary database
    // access point: http://localhost:3000/orderAPI/database
    res.json(orderDatabase);
  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.post('/search', function(req, res) {

    // find order details
    // http://localhost:3000/orderAPI/search
    var orderDetails = {};
    var serverMessage = '';
    var searchRequest = req.body;

    // simulate search send {"orderId" : 1}
    // Triggered server response when order is placed
    console.log('Searching for order ' + searchRequest.orderId);

    if(orderDatabase.length <= searchRequest.orderId){
      serverMessage = 'orderId: ' + searchRequest.orderId + ' was not found'
    }else{
      orderDetails  = orderDatabase[searchRequest.orderId];
      serverMessage = 'orderId: ' + searchRequest.orderId + ' located'
    }


    res.json({
      serverResponse : 'Searching for order: ' + searchRequest.orderId,
      serverMessage : serverMessage,
      orderDetails: orderDetails
    });
  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//This is what we expect an order json to look like
  var exampleOrder =
  {"order" :
  {"recipient" :
  {"name" : "Jazy Jasilo",
    "address" : "3300 University Blvd, Winter Park, FL 32792",
    "email" : "orange@fullsail.edu",
    "phone" : "555-555-5555"},
    "units" : [{
      "unitId" : "a5296ab9-9eee-7ba0-0a79-b801594f2c91",
      "quantity" : 4}
    ]}
  };

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
router.post('/placement', function(req, res) {
  var orderPlacement = req.body;
  orderTracking = { status : 'packing', timestamp : 'today'};
  orderRecipient = orderPlacement.order.recipient;
  orderUnits = orderPlacement.order.units;


  var placement = {};
  placement.tracking = orderTracking;
  placement.recipient = orderRecipient;
  placement.unit = orderUnits;

  orderDatabase.push(placement);
  console.log(placement);


  res.json({
    serverResponse : "Your placement is being processed",
    orderDetails: placement
  });
});


  return router;
};
