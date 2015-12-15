//// Gravity Application Test | Test CRDU for a unit
//// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//var expect = require("chai").expect;
//var assert = require("assert");
//var should = require('should');
//var worker = require('../server/models/worker.js');
//
//
//// Order model defines this function
//describe('workerCRUD', function() {
//  this.timeout(10000);
//
//  var testingId = '';
//
//  // Create test
//  it('createWorker', function (done) {
//    worker.create({
//      name: 'muffin man'
//    }, function (data) {
//     testingId = data.id;
//      done();
//    }, function (err){
//      console.log('err' + err);
//    });
//  });
//
//  // Find Test
//  it('findOne', function (done) {
//    worker.findOne({
//      id: testingId
//    }, function () {
//      done();
//    }, function (err){
//      console.log('err' + err);
//    });
//  });
//
//  //Update Test
//  it("updateWorker", function (done){
//    worker.update({id: testingId}, {name:'Brandy Bergh'}, function (data) {
//
//      //expect(data.shipping_tracking).to.be.equal(99);
//      done();
//    }, function (err){
//      console.log('err' + err);
//    });
//  });
//
//
//
//  // Remove Test
//  it('removeWorker', function (done) {
//    worker.remove({
//      id: testingId
//    }, function () {
//      done();
//    }, function (err){
//      console.log('err' + err);
//    });
//  });
//
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
