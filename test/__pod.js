// Gravity Application Test | Test CRDU for a unit
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var pod = require('../server/models/pod.js');


// Order model defines this function
describe('podCRUD', function() {
  this.timeout(10000)

  var testingId = '';

  // Create test
  it('createPod', function (done) {
    pod.create({
      current_weight: 123,
      max_weight: 123,
      last_maintained: 123,
    }, function (data) {
    data.current_weight.should.equal(123);
    data.max_weight.should.equal(123);
    data.last_maintained.should.equal(123);
     testingId = data.id;
      done();
    }, function (err){
      console.log('err' + err);
    });
  });

  // Find Test
  it('findOne', function (done) {
    pod.findOne({
      id: testingId
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });

  //Update Test
  it("updatePod", function (done){
    pod.update({id: testingId}, {current_weight:99, max_weight:99, last_maintained:1600}, function (data) {

      expect(data.current_weight).to.be.equal(99);
      expect(data.max_weight).to.be.equal(99);
      expect(data.last_maintained).to.be.equal(1600);
      done();
    }, function (err){
      console.log('err' + err);
    });
  });


  //Remove Test
  it('removePod', function (done) {
    pod.remove({
      id: testingId
    }, function () {
      done();
    }, function (err){
      console.log('err' + err);
    });
  });

});
















