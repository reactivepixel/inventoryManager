// Gravity Application Test | Test CRDU for a unit
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var unit = require('../server/models/unit.js');


// unit model defines this function
describe('unitCRUD', function() {
  var testingSku = '';

  // Create test
  it('createUnit', function (done) {
    unit.create({
      qty_on_hand: 34,
      trigger_qty: 25,
      replenish_qty: 55
    }, function (data) {
      data.qty_on_hand.should.equal(34);
      testingSku = data.sku;
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

