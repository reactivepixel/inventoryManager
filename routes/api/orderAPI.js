// Gravity Application Server | orderAPI
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();

  // Sample Database
  var orderDatabase = [
    {orderId: '5f41c846-4c48-ae09-52da-658d47614d9e', status: 'packing', order : [
      {item : 'teacup', price : 2.00, quality : 4, location : {robotId : 1042, currentStock : '32', restock : '20', status: 'charging'}},
      {item : 'teapot', price : 4.00, quality : 2, location : {robotId : 1693, currentStock : '14', restock : '10', status: 'inTransit'}},
      {item : 'teaset', price : 8.00, quality : 1, location : {robotId : 1285, currentStock : '17', restock : '10', status: 'delivered'}}
    ], recipient : {name : 'Yanely Ramirez', address : '3300 University Blvd, Winter Park, FL 32792', contact : "555-555-5555"}},

    {orderId: '7bf13dc8-5e09-eedd-2ad4-a0cfbebafc29', status: 'packing', order : [
      {item : 'usbDrive', price : 12.00, quality : 2, location : {robotId : 1424, currentStock : '98', restock : '50', status: 'delivered'}},
      {item : 'Computer', price : 90.00, quality : 1, location : {robotId : 1777, currentStock : '44', restock : '20', status: 'delivered'}},
      {item : 'Keyboard', price : 25.00, quality : 1, location : {robotId : 1982, currentStock : '17', restock : '15', status: 'inTransit'}}
    ], recipient : {name : 'Brandy Bergh', address : '3300 University Blvd, Winter Park, FL 32792', contact : "555-555-5555"}}
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
      '<br><br>For Order List: http://localhost:3000/orderAPI/orders' +
      '<br><br>For specific order details, send data to: http://localhost:3000/orderAPI/details' +
      '<br>&#8195 Data format: {orderId : "number"}');


  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/orders', function(req, res) {

    // display all orders in database
    // access point: http://localhost:3000/orderAPI/orders
    res.json(orderDatabase);
  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.post('/details', function(req, res) {

    // find order details
    // http://localhost:3000/orderAPI/details
    var orderDetails = {};
    var serverMessage = '';
    var requestOrder = req.body;

    // Triggered server response when order is placed
    console.log('Request For Order ' + requestOrder.orderId);


    for(var i = 0; i <= orderDatabase.length; i++) {

      // if there is no match run this
      if(i == orderDatabase.length){
        serverMessage = "order " + requestOrder.orderId + " Doesn't Exist";
        console.log(serverMessage);
        orderDetails = {};
        break;
      }

      // when a match is found run this
      if(orderDatabase[i].orderId == requestOrder.orderId) {
        orderDetails = orderDatabase[i];
        serverMessage = "order " + requestOrder.orderId + " Located";
        console.log(serverMessage);
        break;
      }
    }

    res.json({
      serverResponse : 'Searching For Order: ' + requestOrder.orderId,
      serverMessage : serverMessage,
      orderDetails: orderDetails
    });
  });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
router.post('/placement', function(req, res) {
  var clientPlacement = {};

  // TODO: fill in recipient properties & robots
  clientPlacement.orderId = idGenerator();
  clientPlacement.status = 'processing';
  clientPlacement.order = req.body;

  // adding to pretend database
  orderDatabase.push(clientPlacement);
  var serverMessage = "your orderId is: " + clientPlacement.orderId;

  res.json({
    serverResponse : "Your order is being processed",
    serverMessage : serverMessage,
    orderDetails: clientPlacement
  });
});


  return router;
};
