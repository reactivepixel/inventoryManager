const request = require('supertest');

describe('Order Routes', function() {
  var server;
  var testOrderData = {
  "units": [
    {
    "sku": 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    "quantity": 5},
    {
    "sku": 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
    "quantity": 2}
    ],
    "fullName": "James Dickerson",
    "streetAddress": "14250 Cheval Mayfaire",
    "city": "Orlando",
    "state": "FL",
    "zip": "32828",
    "phone": "305-710-8220",
    "email": "jamesalexanderdickerson@gmail.com"
  }

  var testOrder;

  beforeEach(function() {
    server = require('../server/server.js');
  });

  afterEach(function() {
    server.close();
  });



  //Testing if an order was created.
  it('Order Create', function(done) {
    request(server)
      .put('/order')
      .set('Accept', 'application/json')
      .send(testOrderData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(res.body.fullName !== testOrderData.fullName)
        throw new Error('Order was not properly created.');
        testOrder = res.body;
      })
      .expect(200, done);
  });

  it('Order Read One', function(done) {
    request(server)
      .get('/order/' + testOrder.uuid.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testOrder.uuid !== res.body.uuid) throw new Error('The UUID returned does not match.');
      })
      .expect(200, done);
  });

  it('Order Read All', function(done) {
    request(server)
      .get('/order')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(res.body.length < 1) throw new Error('There are no entries in the database.');
      })
      .expect(200, done);
  });

  it('Order Update', function(done) {
    request(server)
      .get('/order/' + testOrder.uuid.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testOrder.fullName !== res.body.fullName) throw new Error('Did not update record');
      })
      .expect(200, done);
  });

  it('Order Destroy', function(done) {
    request(server)
      .delete('/order/' + testOrder.uuid.toString())
      .set('Accept', 'application/json')
      .send({force: true})
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(!res.body.success) throw new Error ('Destroy failed.')
      })
      .expect(200, done);
  });
})
