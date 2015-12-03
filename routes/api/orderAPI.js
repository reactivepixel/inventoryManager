// Gravity Application Server | orderAPI
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (express) {
  var router = express.Router();

  // Sample Database
  var orderDatabase = [
    {orderId: 10000, status: 'warehouse', stock : [
      {item : 'teacup', price : 2.00, quality : 4, location : {robotId : 1042, currentStock : '32', restock : '20', status: 'charging'}},
      {item : 'teapot', price : 4.00, quality : 2, location : {robotId : 1693, currentStock : '14', restock : '10', status: 'inTransit'}},
      {item : 'teaset', price : 8.00, quality : 1, location : {robotId : 1285, currentStock : '17', restock : '10', status: 'delivered'}}
    ], recipient : {name : 'Yanelly Ramirez', address : '3300 University Blvd, Winter Park, FL 32792', contact : 555-555-5555}},

    {orderId: 10001, status: 'warehouse', stock : [
      {item : 'usbDrive', price : 12.00, quality : 2, location : {robotId : 1424, currentStock : '98', restock : '50', status: 'delivered'}},
      {item : 'Computer', price : 90.00, quality : 1, location : {robotId : 1777, currentStock : '44', restock : '20', status: 'delivered'}},
      {item : 'Keyboard', price : 25.00, quality : 1, location : {robotId : 1982, currentStock : '17', restock : '15', status: 'inTransit'}}
    ], recipient : {name : 'Brandy Bergh', address : '3300 University Blvd, Winter Park, FL 32792', contact : 555-555-5555}}
  ];



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
    var clientOrder = req.body;

    // Triggered server response when order is placed
    console.log('Request For Order ' + clientOrder.orderId);


    for(i = 0; i <= orderDatabase.length; i++){

      // if there is no match run this
      if(i == orderDatabase.length){
        serverMessage = "order " + clientOrder.orderId + " Doesn't Exist";
        console.log(serverMessage);
        orderDetails = {};
        break;
      }

      // when a match is found run this
      if(orderDatabase[i].orderId == clientOrder.orderId){
        orderDetails = orderDatabase[i];
        serverMessage = "order " + clientOrder.orderId + " Located";
        console.log(serverMessage);
        break;
      }
    }

    res.json({
      serverResponse : 'Results For Order: ' + clientOrder.orderId,
      serverMessage : serverMessage,
      Details: orderDetails
    });
  });

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
router.post('/placement', function(req, res) {
  // TODO: accept order being placed externally
});






  return router;
};
