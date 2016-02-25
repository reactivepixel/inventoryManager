const request = require('supertest');
const faker = require('faker');

describe('Order routes', function() {
  var server;
  var testOrderData = {
    units: [],
    fullName: faker.name.findName(),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
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
      .set('Accept', 'application/json')
      .send(testOrderData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(res.body.recipient.name !== testOrderData.recipient.name) throw new Error('Order data did not create properly: Recipients name doesnt match!');
        orderData = res.body;
        console.log(res.body.recipient.name);
      })
      .expect(200, done)
  });
});
