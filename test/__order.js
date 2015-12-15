// Gravity Application Test | order CRUD test for a orders
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var order = require('../server/models/order.js');


// Order model defines this function
describe('order CRUD Test', function() {
  this.timeout(10000);

  var testingId = '';

  // Create test
  it('create-order-test', function (done) {
    order.create({
      name:'Testing User',
      address:'555 Testing Address',
      city: 'Orlando',
      state: 'FL',
      zip: 32792,
      phone: 5555555
    }, function (data) {
      testingId = data.id;
      console.log('================');
      console.log('create order Id: ' + data.id + " created successfully");
      console.log('================');
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  // Find Test
  it('find-order-test', function (done) {
    order.findOne({
      id: testingId
    }, function () {
      console.log('================');
      console.log('find order Id: ' + testingId + " located successfully");
      console.log('================');
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  // Remove Test
  it('remove-order-test', function (done) {
    order.remove({
      id: testingId
    }, function () {
      console.log('================');
      console.log('remove order Id: ' + testingId + " removed successfully");
      console.log('================');
      done();
    }, function (err){
      console.log('err' + err);
    });
  });
});
  















