// // Gravity Application Test | order CRUD test for a orders
// // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// var expect = require("chai").expect;
// var assert = require("assert");
// var should = require('should');
// var order = require('../server/models/order.js');


// // Order model defines this function
// describe('order CRUD Test', function() {
//   this.timeout(10000);

//   var testingId = '';

//   // Create test
//   it('create-order-test', function (done) {
//     order.create({
//       name:'muffin man',
//       address:'55 Cottonwood Trail',
//       city: 'Orlando',
//       state: 'FL',
//       zip: 32792,
//       phone: 5555555
//     }, function (data) {
//     data.name.should.equal('muffin man');
//      testingId = data.id;
//       done();
//     }, function (err){
//       console.log('err' + err);
//     });
//   });


//   // Find Test
//   it('find-order-test', function (done) {
//     order.findOne({
//       id: testingId
//     }, function () {
//       done();
//     }, function (err){
//       console.log('err' + err);
//     });
//   });

// //Update Test
//   it("updateOrder", function (done){
//     order.update({id: testingId}, {name:'whatever'}, function (data) {

//       expect(data.name).to.be.equal('whatever');

//       done();
//     }, function (err){
//       console.log('err' + err);
//     });
//   });


//   // Update Test
//   // Change Testing user to Updated user then print to the console

//   // Remove Test
//   it('remove-order-test', function (done) {
//     order.remove({
//       id: testingId
//     }, function () {
//       console.log('================');
//       console.log('remove order Id: ' + testingId + " removed successfully");
//       console.log('================');
//       done();
//     }, function (err){
//       console.log('err' + err);
//     });
//   });
// });
















