'use strict';
const request = require('request');
const faker = require('faker');

// Hits variable controls how many times the request loop will autoamtically run
let hits = 1;

// Automated request loop
let i;
for(i = 0; i < hits; i++) {
  /**
   * Using Faker to produce fake user information
   * Faker API documentation at https://github.com/marak/faker.js
   */
  const payload = {
    "units": [
      {
      "sku": 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      "quantity": 5},
      {
      "sku": 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
      "quantity": 2}
      ],

      "fullName": "James Dickerson",
      "streetAddress": "14250 Cheval Mayfaire",
      "city": "Orlando",
      "state": "FL",
      "zip": "32828",
      "phone": "305-710-8220",
      "email": "jamesalexanderdickerson@gmail.com"
  };

/**
 * HTTP PUT Request hitting endpoint /order
 * Converting payload to string for readibility purposes
 */
  request({
    uri: 'http://localhost:3000/order',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload)
  }, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
};
