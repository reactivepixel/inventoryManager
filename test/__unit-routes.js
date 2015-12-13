// Gravity Application Test | Test routes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var expect = require("chai").expect;
var assert = require("assert");
var should = require('should');
var request = require('request');
var url = 'http://localhost:3000/api/v1/unit/create';

// unitCreate Test
request({
  method: "POST",
  url: url,
  json: true,
  headers: {
    "content-type": "application/json",
  },
  // body: JSON.stringify(unitCreateData)
  body: {
    units: [
      {
        uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 4,
        status: {
          responseCode: 200
        }
      }
    ]
  }
}),

console.log(body.units.status.responseCode);
