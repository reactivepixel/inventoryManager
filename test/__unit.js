var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var unit = require('../server/models/unit.js');

describe('Unit', function() {
    it('Adds New', function (done) {
        unit.create({
            qty_on_hand: 34,
            trigger_qty: 25,
            replenish_qty: 55
        }, function (data) {
            data.qty_on_hand.should.equal(34);
            done();
        }, function (err){
          console.log('err' + err);
        });
    });
});
