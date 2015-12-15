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
      name:'muffin man',
      address:'55 Cottonwood Trail',
      city: 'Orlando',
      state: 'FL',
      zip: 32792,
      phone: 5555555,
    }, function (data) {
    data.name.should.equal('muffin man');
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
  
//Update Test
  it("updateOrder", function (done){
    order.update({id: testingId}, {name:'whatever'}, function (data) {

      expect(data.name).to.be.equal('whatever');
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
});
  















