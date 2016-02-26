const request = require('supertest');
const faker = require('faker');

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
        if(res.body.recipient.name !== testOrderData.recipient.name)
        throw new Error('Order was not properly created.');
        testOrder = res.body;
      })
      .expect(200, done);
  });


})
