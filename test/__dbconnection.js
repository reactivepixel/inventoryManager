'use-strict'
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('test', function() {
  it('/should send data over request', function(done) {
    server
    .put('/order')
    .send({
      units: [
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: '2'},
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
        quantity: '3'}
      ],
      recipients: {
        name: 'Sally',
        address: {
          street: '3300 University Blvd',
          city: 'Winter Park',
          state: 'FL',
          zip: '32792'
        },
        phone: '123-456-7890',
        email: 'test@testemail.com'
      }
    })
    .expect('Content-Type', /json/)
    .expect(function(err, res) {
      if(!res.body.data.recipients.name.should.equal('Sally')){
        throw new Error('This is supposed to error')
      }
      res.body.err.should.equal(false)
      res.body.data.recipients.name.should.equal('Sally')
      res.body.data.units.sku.should.equal('test')

    })
    .end(done());
  });
});
