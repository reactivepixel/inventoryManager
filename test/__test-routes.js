// Gravity Application Test | order Route test for a orders
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app         = require('../server.js');
var http        = require('http');

var assert      = require('assert');
var expect      = require('chai').expect;
var should      = require('chai').should();

var supertest   = require('supertest');
var api         = supertest('http://localhost:3000');


// order-route-create-test
console.log('=======================');
console.log('order-route-create-test');
console.log('=======================');

var qstring = JSON.stringify({
  name : "Jazy Jasilo",
  address: "555 Jazy Lane",
  city: "Jazy Town",
  state: "JZ",
  phone: 555555555
});

describe('order/create', function() {
  it('should return a 200 response', function(done) {
    api.get('/api/v1/order/create')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('should create a new order record', function(done) {
    api.post('/api/v1/order/create')
    .set('Accept', 'application/x-www.form-urlencoded')
    .send(qstring)
    .expect(200)
    .end(function(err, res) {
      expect(res.body.name).to.equal('Jazy Jasilo');
      expect(res.body.address).to.equal('555 Jazy Lane');
      expect(res.body.city).to.equal('Jazy Town');
      expect(res.body.state).to.equal('JZ');
      expect(res.body.phone).to.equal(555555555);
      done();
    });
  })
})


// order-route-find-test
// console.log('=======================');
// console.log('order-route-find-test');
// console.log('=======================');


// order-route-update-test
// console.log('=======================');
// console.log('order-route-update-test');
// console.log('=======================');


// order-route-remove-test
// console.log('=======================');
// console.log('order-route-remove-test');
// console.log('=======================');
