// Gravity Application Test | Test CRDU for a unit
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var order = require('../server/models/order.js');


// Order model defines this function
describe('orderCRUD', function() {
  this.timeout(10000);

  var testingId = '';

  // Create test
  it('createOrder', function (done) {
    order.create({
      shipping_tracking: 34
    }, function (data) {
    data.shipping_tracking.should.equal(34);
     testingId = data.id;
      done();
    }, function (err){
      console.log('err' + err);
    });
  });

  // Find Test
  it('findOne', function (done) {
    order.findOne({
      id: testingId
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  // Remove Test
  it('removeOrder', function (done) {
    order.remove({
      id: testingId
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });

  //Update Test
  it("updateOrder", function (done){
    order.update({id: 7}, {shipping_tracking:99}, function (data) {

      expect(data.shipping_tracking).to.be.equal(99);
      done();
    }, function (err){
      console.log('err' + err);
    });
  });
});
















