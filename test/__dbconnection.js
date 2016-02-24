const request = require('supertest');
const faker = require('faker');

describe('Order routes', function() {
  var server;
  var testOrderData = {
    units: [
      {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: faker.random.number()},
      {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
      quantity: faker.random.number()}
    ],
    recipients: {
      name: faker.name.findName(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode()
      },
      phone: faker.phone.phoneNumberFormat(),
      email: faker.internet.email()
    }
  };

  var orderData;

  beforeEach(function() {
    server = require('../server/server.js');
  });

  afterEach(function() {
    server.close();
  });

  it('Order create one', function(done) {
    request(server)
      .put('/order')
      .send(testOrderData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(res.body.recipients.name !== testOrderData.recipients.name) throw new Error('Order data did not create properly: Recipients name doesnt match!');
        orderData = res.body;
      })
      .expect(200, done)
  });
});
