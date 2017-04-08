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
        if(res.body.sku !== testOrderData.sku)
        throw new Error('Inventory was not properly created.');
        testInventory = res.body;
      })
      .expect(200, done);
  });

  it('Inventory Read One', function(done) {
    request(server)
      .get('/inventory/' + testInventory.sku.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testInventory[0].sku !== res.body.sku) throw new Error('The sku returned does not match.');
      })
      .expect(200, done);
  });

  it('Inventory Read All', function(done) {
    request(server)
      .get('/inventory')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(res.body.length < 1) throw new Error('There are no entries in the database.');
      })
      .expect(200, done);
  });

  it('Inventory Update', function(done) {
    request(server)
      .get('/inventory/' + testInventory.sku.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testInventory[0].sku !== res.body.sku) throw new Error('Did not update record');
      })
      .expect(200, done);
  });

  it('Inventory Destroy', function(done) {
    request(server)
      .delete('/inventory/' + testInventory[0].sku)
      .set('Accept', 'application/json')
      .send({force: true})
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(!res.body.success) throw new Error ('Destroy failed.')
      })
      .expect(200, done);
  });
})
