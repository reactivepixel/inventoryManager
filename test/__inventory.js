const request = require('supertest');

describe('Inventory Route', function() {
  var server;
  var testOrderData = {
    "sku": "a5296ab9-9eee-7ba0-0a79-b801594f2c94",
    "location": "California"
  }
  
  var testInventory;
  
  beforeEach(function() {
    server = require('../server/server.js');
  });

  afterEach(function() {
    server.close();
  });
  
  //Testing if the inventory was created.
  it('Inventory Create', function(done) {
    request(server)
      .put('/inventory')
      .set('Accept', 'application/json')
      .send(testOrderData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        console.log("**************", res.body.sku);
        if(res.body.sku !== testOrderData.sku)
        throw new Error('Inventory was not properly created.');
        testOrder = res.body;
      })
      .expect(200, done);
  });
  
  it('Inventory Read One', function(done) {
    request(server)
      .get('/inventory/' + testOrder.uuid.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testOrder.uuid !== res.body.uuid) throw new Error('The UUID returned does not match.');
      })
      .expect(200, done);
  });
})