// Gravity Application Test | Test CRDU for a unit
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var unit = require('../server/models/unit.js');


// unit model defines this function
describe('unitCRUD', function() {
  this.timeout(10000);

  var testingSku = '';

  // Create test
  it('createUnit', function (done) {
    unit.create({
      statusId:12,
      available_qty: 34,
      trigger_qty: 25,
      replenish_qty: 55,
      description: "bald",
      weight_lb: 44, 
    }, function (data) {
    data.statusId.should.equal(12);
     testingSku = data.sku;
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  // Find Test
  it('findOne', function (done) {
    unit.findOne({
      sku: testingSku
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  // Remove Test
  it('removeUnit', function (done) {
    unit.remove({
      sku: testingSku
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });
});

